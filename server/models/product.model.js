import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Provide product name"], trim: true },
    description: { type: String, default: "" },
    images: [{ type: String }],
    brand: { type: String, default: "" },
    price: { type: Number, required: [true, "Provide price"], min: 0 },
    oldPrice: { type: Number, default: 0, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category", index: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "category", index: true },
    countInStock: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    sizes: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    sales: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", brand: "text", description: "text" });

const ProductModel = mongoose.models.product || mongoose.model("product", productSchema);
export default ProductModel;
