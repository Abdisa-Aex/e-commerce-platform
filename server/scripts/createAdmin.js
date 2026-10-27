// Creates (or promotes) the admin account used to log in to the admin dashboard.
//
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='StrongPass123' ADMIN_NAME='Your Name' npm run create-admin
//
// Public admin sign-up is intentionally NOT exposed through the API.
import "dotenv/config";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import UserModel from "../models/Users.model.js";

const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || "";
const name = process.env.ADMIN_NAME || "Admin";

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing");
if (!email || password.length < 8) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD (min 8 characters)");
  process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI);
const hashed = await bcryptjs.hash(password, 10);
const user = await UserModel.findOneAndUpdate(
  { email },
  { name, email, password: hashed, role: "ADMIN", verify_email: true, status: "Active" },
  { upsert: true, new: true, setDefaultsOnInsert: true }
);
console.log(`✅ Admin ready: ${user.email}`);
await mongoose.disconnect();
