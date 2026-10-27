import jwt from "jsonwebtoken";
import crypto from "crypto";

export const signAccessToken = (userId) =>
  jwt.sign({ id: userId }, process.env.SECRET_KEY_ACCESS_TOKEN, { expiresIn: "1h" });

export const signRefreshToken = (userId) =>
  jwt.sign({ id: userId }, process.env.SECRET_KEY_REFRESH_TOKEN, { expiresIn: "30d" });

// Short-lived token proving the user passed the forgot-password OTP step
export const signResetToken = (userId) =>
  jwt.sign({ id: userId, purpose: "reset" }, process.env.SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: "15m",
  });

export const generateOtp = () => crypto.randomInt(100000, 1000000).toString();

export const hashOtp = (otp) =>
  crypto.createHash("sha256").update(String(otp)).digest("hex");

// refresh tokens are stored hashed, like OTPs
export const hashToken = hashOtp;
