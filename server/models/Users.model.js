import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Provide name"], trim: true },
    email: {
      type: String,
      required: [true, "Provide email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, "Provide password"], select: false },
    avatar: { type: String, default: "" },
    mobile: { type: String, default: "" },
    verify_email: { type: Boolean, default: false },
    last_login_date: { type: Date, default: null },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    // OTPs are stored as SHA-256 hashes, never in plain text
    otp: { type: String, default: null, select: false },
    otpExpires: { type: Date, default: null, select: false },
    forgot_password_otp: { type: String, default: null, select: false },
    forgot_password_expiry: { type: Date, default: null, select: false },
    // hashed refresh tokens, one per signed-in device (max 5) so phone + laptop can both stay logged in
    refresh_tokens: { type: [String], default: [], select: false },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
