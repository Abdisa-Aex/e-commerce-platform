import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please provide MONGODB_URI in the environment variables");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB connected");
};

export default connectDB;
