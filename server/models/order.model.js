import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    name: String,
    image: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    orderId: { type: String, required: [true, "Provide orderId"], unique: true },
    items: [orderItemSchema],
    // Snapshot of the address at order time so later edits don't change old orders
    delivery_address: {
      fullName: String,
      address_line: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
      mobile: String,
    },
    paymentMethod: { type: String, enum: ["COD", "CHAPA"], default: "COD" },
    paymentId: { type: String, default: "" },
    payment_status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    order_status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    subTotalAmt: { type: Number, default: 0 },
    shippingAmt: { type: Number, default: 0 },
    totalAmt: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const OrderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default OrderModel;
