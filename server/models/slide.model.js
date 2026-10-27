import mongoose from "mongoose";

const slideSchema = new mongoose.Schema(
  {
    image: { type: String, required: [true, "Provide slide image"] },
    title: { type: String, default: "" },
    link: { type: String, default: "" },
  },
  { timestamps: true }
);

const SlideModel = mongoose.models.slide || mongoose.model("slide", slideSchema);
export default SlideModel;
