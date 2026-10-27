import crypto from "crypto";
import mongoose from "mongoose";
import OrderModel from "../models/order.model.js";
import CartProductModel from "../models/cartproduct.model.js";
import ProductModel from "../models/product.model.js";
import AddressModel from "../models/address.model.js";
import UserModel from "../models/Users.model.js";

const ok = (res, data = {}, message = "", status = 200) =>
  res.status(status).json({ success: true, error: false, message, ...data });
const bad = (res, message, status = 400) =>
  res.status(status).json({ success: false, error: true, message });
const validId = (id) => mongoose.isValidObjectId(id);

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
const newOrderId = () => `ORD-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;

const restock = async (items) => {
  await Promise.all(
    items.map((i) =>
      ProductModel.updateOne({ _id: i.productId }, { $inc: { countInStock: i.quantity, sales: -i.quantity } })
    )
  );
};

/* ----------------------------- PLACE ORDER ---------------------------- */
export const createOrder = async (req, res) => {
  const { addressId } = req.body;
  const paymentMethod = req.body.paymentMethod === "CHAPA" ? "CHAPA" : "COD";
  if (paymentMethod === "CHAPA" && !process.env.CHAPA_SECRET_KEY) {
    return bad(res, "Online payment is not available right now. Choose cash on delivery.");
  }
  if (!validId(addressId)) return bad(res, "Choose a delivery address");

  const address = await AddressModel.findOne({ _id: addressId, userId: req.user._id, status: true });
  if (!address) return bad(res, "Delivery address not found");

  const cart = await CartProductModel.find({ userId: req.user._id }).populate("productId");
  const lines = cart.filter((c) => c.productId);
  if (!lines.length) return bad(res, "Your cart is empty");

  // Reserve stock atomically, line by line; undo on the first failure
  const reserved = [];
  for (const line of lines) {
    const done = await ProductModel.findOneAndUpdate(
      { _id: line.productId._id, countInStock: { $gte: line.quantity } },
      { $inc: { countInStock: -line.quantity, sales: line.quantity } }
    );
    if (!done) {
      await restock(reserved);
      return bad(res, `Not enough stock for "${line.productId.name}"`, 409);
    }
    reserved.push({ productId: line.productId._id, quantity: line.quantity });
  }

  // Prices are read from the database, never trusted from the browser
  const items = lines.map((l) => ({
    productId: l.productId._id,
    name: l.productId.name,
    image: l.productId.images?.[0] || "",
    price: l.productId.price,
    quantity: l.quantity,
  }));
  const subTotalAmt = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingAmt = Number(process.env.SHIPPING_FEE || 0);

  let order;
  try {
    order = await OrderModel.create({
      userId: req.user._id,
      orderId: newOrderId(),
      items,
      delivery_address: {
        fullName: address.fullName || req.user.name,
        address_line: address.address_line,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
        mobile: address.mobile,
      },
      paymentMethod,
      subTotalAmt,
      shippingAmt,
      totalAmt: subTotalAmt + shippingAmt,
    });
  } catch (err) {
    await restock(reserved);
    throw err;
  }

  await CartProductModel.deleteMany({ userId: req.user._id });
  return ok(res, { order }, "Order placed", 201);
};

export const myOrders = async (req, res) => {
  const orders = await OrderModel.find({ userId: req.user._id }).sort({ createdAt: -1 }).lean();
  return ok(res, { orders });
};

export const getOrder = async (req, res) => {
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  const filter = { _id: req.params.id };
  if (req.user.role !== "ADMIN") filter.userId = req.user._id;
  const order = await OrderModel.findOne(filter).populate("userId", "name email mobile").lean();
  if (!order) return bad(res, "Order not found", 404);
  return ok(res, { order });
};

export const cancelMyOrder = async (req, res) => {
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  const order = await OrderModel.findOne({ _id: req.params.id, userId: req.user._id });
  if (!order) return bad(res, "Order not found", 404);
  if (order.order_status !== "pending") return bad(res, "Only pending orders can be cancelled");
  if (order.payment_status === "PAID") return bad(res, "Paid orders must be cancelled by support");
  order.order_status = "cancelled";
  await order.save();
  await restock(order.items);
  return ok(res, { order }, "Order cancelled");
};

/* -------------------------------- CHAPA ------------------------------- */
export const chapaInit = async (req, res) => {
  if (!process.env.CHAPA_SECRET_KEY) return bad(res, "Online payment is not configured", 503);
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  const order = await OrderModel.findOne({ _id: req.params.id, userId: req.user._id });
  if (!order) return bad(res, "Order not found", 404);
  if (order.payment_status === "PAID") return bad(res, "Order is already paid");
  if (order.order_status === "cancelled") return bad(res, "Order was cancelled");

  const clientUrl = (process.env.CLIENT_URL || "").split(",")[0].replace(/\/$/, "");
  const [first, ...rest] = req.user.name.split(" ");
  const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: String(order.totalAmt),
      currency: "ETB",
      email: req.user.email,
      first_name: first,
      last_name: rest.join(" ") || first,
      tx_ref: order.orderId,
      return_url: `${clientUrl}/my-orders?pay=${order.orderId}`,
      customization: { title: "Spices Gold", description: `Order ${order.orderId}`.slice(0, 50) },
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data?.data?.checkout_url) {
    console.error("Chapa init failed:", data);
    return bad(res, "Could not start online payment, please try again", 502);
  }
  return ok(res, { checkoutUrl: data.data.checkout_url });
};

export const chapaVerify = async (req, res) => {
  if (!process.env.CHAPA_SECRET_KEY) return bad(res, "Online payment is not configured", 503);
  const order = await OrderModel.findOne({ orderId: req.params.txRef, userId: req.user._id });
  if (!order) return bad(res, "Order not found", 404);
  if (order.payment_status === "PAID") return ok(res, { order }, "Already paid");

  const response = await fetch(
    `https://api.chapa.co/v1/transaction/verify/${encodeURIComponent(order.orderId)}`,
    { headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` } }
  );
  const data = await response.json().catch(() => ({}));
  const paid =
    response.ok &&
    data?.data?.status === "success" &&
    Number(data.data.amount) >= order.totalAmt;

  if (paid) {
    order.payment_status = "PAID";
    order.paymentId = data.data.reference || order.orderId;
    if (order.order_status === "pending") order.order_status = "confirmed";
    await order.save();
    return ok(res, { order }, "Payment confirmed");
  }
  return bad(res, "Payment not completed yet", 402);
};

/* -------------------------------- ADMIN ------------------------------- */
export const adminListOrders = async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 10);
  const filter = {};
  if (STATUSES.includes(req.query.status)) filter.order_status = req.query.status;
  const [orders, total] = await Promise.all([
    OrderModel.find(filter)
      .populate("userId", "name email mobile")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    OrderModel.countDocuments(filter),
  ]);
  return ok(res, { orders, total, page, pages: Math.ceil(total / limit) });
};

export const adminUpdateOrder = async (req, res) => {
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  const order = await OrderModel.findById(req.params.id);
  if (!order) return bad(res, "Order not found", 404);

  const { order_status, payment_status } = req.body;
  if (order_status) {
    if (!STATUSES.includes(order_status)) return bad(res, "Invalid order status");
    if (order_status === "cancelled" && order.order_status !== "cancelled") await restock(order.items);
    order.order_status = order_status;
    // cash on delivery is paid when it is delivered
    if (order_status === "delivered" && order.paymentMethod === "COD") order.payment_status = "PAID";
  }
  if (payment_status) {
    if (!["PENDING", "PAID", "FAILED"].includes(payment_status)) return bad(res, "Invalid payment status");
    order.payment_status = payment_status;
  }
  await order.save();
  return ok(res, { order }, "Order updated");
};

export const adminStats = async (req, res) => {
  const since = new Date();
  since.setMonth(since.getMonth() - 11, 1);
  since.setHours(0, 0, 0, 0);

  const [users, products, orders, revenueAgg, monthly, recent] = await Promise.all([
    UserModel.countDocuments({ role: "USER" }),
    ProductModel.countDocuments(),
    OrderModel.countDocuments(),
    OrderModel.aggregate([
      { $match: { order_status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalAmt" } } },
    ]),
    OrderModel.aggregate([
      { $match: { createdAt: { $gte: since }, order_status: { $ne: "cancelled" } } },
      {
        $group: {
          _id: { y: { $year: "$createdAt" }, m: { $month: "$createdAt" } },
          sales: { $sum: "$totalAmt" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id.y": 1, "_id.m": 1 } },
    ]),
    OrderModel.find().populate("userId", "name email").sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  return ok(res, {
    users,
    products,
    orders,
    revenue: revenueAgg[0]?.total || 0,
    monthly: monthly.map((m) => ({ year: m._id.y, month: m._id.m, sales: m.sales, orders: m.orders })),
    recent,
  });
};
