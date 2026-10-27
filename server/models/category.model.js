import mongoose from "mongoose";

// One collection for categories AND sub categories.
// A sub category simply has a parentId that points at its parent category.
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Provide category name"], trim: true },
    image: { type: String, default: "" },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "category", default: null },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.models.category || mongoose.model("category", categorySchema);
export default CategoryModel;
