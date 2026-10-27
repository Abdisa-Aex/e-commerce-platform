import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    fullName: { type: String, default: "" },
    address_line: { type: String, required: [true, "Provide address"] },
    city: { type: String, required: [true, "Provide city"] },
    state: { type: String, default: "" },
    pincode: { type: String, default: "" },
    country: { type: String, default: "Ethiopia" },
    mobile: { type: String, required: [true, "Provide phone number"] },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const AddressModel = mongoose.models.address || mongoose.model("address", addressSchema);
export default AddressModel;
