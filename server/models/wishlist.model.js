import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
  },
  { timestamps: true }
);

wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

const WishlistModel = mongoose.models.wishlist || mongoose.model("wishlist", wishlistSchema);
export default WishlistModel;
