import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    quantity: { type: Number, default: 1, min: 1 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

cartProductSchema.index({ userId: 1, productId: 1 }, { unique: true });

const CartProductModel =
  mongoose.models.cartProduct || mongoose.model("cartProduct", cartProductSchema);
export default CartProductModel;
