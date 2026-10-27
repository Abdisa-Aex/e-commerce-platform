import mongoose from "mongoose";
import CartProductModel from "../models/cartproduct.model.js";
import WishlistModel from "../models/wishlist.model.js";
import AddressModel from "../models/address.model.js";
import ProductModel from "../models/product.model.js";

const ok = (res, data = {}, message = "", status = 200) =>
  res.status(status).json({ success: true, error: false, message, ...data });
const bad = (res, message, status = 400) =>
  res.status(status).json({ success: false, error: true, message });
const validId = (id) => mongoose.isValidObjectId(id);

/* -------------------------------- CART -------------------------------- */
export const getCart = async (req, res) => {
  const rows = await CartProductModel.find({ userId: req.user._id })
    .populate("productId", "name images price oldPrice discount countInStock brand")
    .lean();
  // drop rows whose product was deleted
  const items = rows.filter((r) => r.productId);
  const subTotal = items.reduce((s, i) => s + i.productId.price * i.quantity, 0);
  return ok(res, { items, subTotal, count: items.reduce((s, i) => s + i.quantity, 0) });
};

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const quantity = Math.max(1, Number(req.body.quantity) || 1);
  if (!validId(productId)) return bad(res, "Invalid product");
  const product = await ProductModel.findById(productId);
  if (!product) return bad(res, "Product not found", 404);
  if (product.countInStock < 1) return bad(res, "This product is out of stock");

  const existing = await CartProductModel.findOne({ userId: req.user._id, productId });
  const newQty = Math.min((existing?.quantity || 0) + quantity, product.countInStock);
  if (existing) {
    existing.quantity = newQty;
    await existing.save();
  } else {
    await CartProductModel.create({ userId: req.user._id, productId, quantity: newQty });
  }
  return ok(res, {}, "Added to cart", 201);
};

export const updateCartItem = async (req, res) => {
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  const quantity = Number(req.body.quantity);
  if (!Number.isInteger(quantity) || quantity < 1) return bad(res, "Quantity must be at least 1");
  const item = await CartProductModel.findOne({ _id: req.params.id, userId: req.user._id }).populate("productId");
  if (!item) return bad(res, "Cart item not found", 404);
  if (item.productId && quantity > item.productId.countInStock) {
    return bad(res, `Only ${item.productId.countInStock} in stock`);
  }
  item.quantity = quantity;
  await item.save();
  return ok(res, {}, "Cart updated");
};

export const removeCartItem = async (req, res) => {
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  await CartProductModel.deleteOne({ _id: req.params.id, userId: req.user._id });
  return ok(res, {}, "Removed from cart");
};

export const clearCart = async (req, res) => {
  await CartProductModel.deleteMany({ userId: req.user._id });
  return ok(res, {}, "Cart cleared");
};

/* ------------------------------ WISHLIST ------------------------------ */
export const getWishlist = async (req, res) => {
  const rows = await WishlistModel.find({ userId: req.user._id })
    .populate("productId", "name images price oldPrice discount rating countInStock brand")
    .lean();
  return ok(res, { items: rows.filter((r) => r.productId) });
};

export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  if (!validId(productId)) return bad(res, "Invalid product");
  if (!(await ProductModel.exists({ _id: productId }))) return bad(res, "Product not found", 404);
  await WishlistModel.updateOne(
    { userId: req.user._id, productId },
    { $setOnInsert: { userId: req.user._id, productId } },
    { upsert: true }
  );
  return ok(res, {}, "Added to wishlist", 201);
};

export const removeFromWishlist = async (req, res) => {
  if (!validId(req.params.productId)) return bad(res, "Invalid id");
  await WishlistModel.deleteOne({ userId: req.user._id, productId: req.params.productId });
  return ok(res, {}, "Removed from wishlist");
};

/* ------------------------------ ADDRESSES ----------------------------- */
const addressFields = (b) => ({
  fullName: b.fullName || "",
  address_line: String(b.address_line || "").trim(),
  city: String(b.city || "").trim(),
  state: b.state || "",
  pincode: b.pincode || "",
  country: b.country || "Ethiopia",
  mobile: String(b.mobile || "").trim(),
});

export const listAddresses = async (req, res) => {
  const addresses = await AddressModel.find({ userId: req.user._id, status: true }).sort({ createdAt: -1 }).lean();
  return ok(res, { addresses });
};

export const createAddress = async (req, res) => {
  const f = addressFields(req.body);
  if (!f.address_line || !f.city || !f.mobile) return bad(res, "Provide address, city and phone number");
  const address = await AddressModel.create({ ...f, userId: req.user._id });
  return ok(res, { address }, "Address saved", 201);
};

export const updateAddress = async (req, res) => {
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  const address = await AddressModel.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    addressFields(req.body),
    { new: true, runValidators: true }
  );
  if (!address) return bad(res, "Address not found", 404);
  return ok(res, { address }, "Address updated");
};

export const deleteAddress = async (req, res) => {
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  // soft delete so old orders keep working
  await AddressModel.updateOne({ _id: req.params.id, userId: req.user._id }, { status: false });
  return ok(res, {}, "Address removed");
};
