import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import UserModel from "../models/Users.model.js";
import sendEmail from "../config/emailService.js";
import VerificationEmail, { ResetPasswordEmail } from "../utils/verifyEmailTemplate.js";
import {
  signAccessToken,
  signRefreshToken,
  signResetToken,
  generateOtp,
  hashOtp,
  hashToken,
} from "../utils/tokens.js";
import { uploadBuffer } from "../config/cloudinary.js";

const OTP_MINUTES = 10;
const ok = (res, data = {}, message = "", status = 200) =>
  res.status(status).json({ success: true, error: false, message, ...data });
const bad = (res, message, status = 400) =>
  res.status(status).json({ success: false, error: true, message });

const normEmail = (e) => String(e || "").trim().toLowerCase();
const isEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const publicUser = (u) => ({
  _id: u._id,
  name: u.name,
  email: u.email,
  avatar: u.avatar,
  mobile: u.mobile,
  role: u.role,
  verify_email: u.verify_email,
  status: u.status,
  createdAt: u.createdAt,
  last_login_date: u.last_login_date,
});

const sendOtpEmail = async (user, otp, kind) => {
  const isReset = kind === "reset";
  return sendEmail({
    to: user.email,
    subject: isReset ? "Reset your password - Spices Gold" : "Verify your email - Spices Gold",
    text: `Your code is ${otp}`,
    html: isReset ? ResetPasswordEmail(user.name, otp) : VerificationEmail(user.name, otp),
  });
};

/* ------------------------------ REGISTER ------------------------------ */
export const registerUserController = async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = normEmail(req.body.email);
  const password = String(req.body.password || "");

  if (!name || !email || !password) return bad(res, "Provide name, email and password");
  if (!isEmail(email)) return bad(res, "Provide a valid email");
  if (password.length < 8) return bad(res, "Password must be at least 8 characters");

  const existing = await UserModel.findOne({ email }).select("+otp +otpExpires");
  if (existing?.verify_email) return bad(res, "User already registered with this email", 409);

  const otp = generateOtp();
  const hashed = await bcryptjs.hash(password, 10);

  // If they registered before but never verified, let them re-register
  const user =
    existing ||
    new UserModel({ name, email, password: hashed });
  user.name = name;
  user.password = hashed;
  user.otp = hashOtp(otp);
  user.otpExpires = new Date(Date.now() + OTP_MINUTES * 60 * 1000);
  await user.save();

  const mail = await sendOtpEmail(user, otp, "verify");
  if (!mail.success) {
    return bad(res, "Account created but we could not send the verification email. Use 'Resend code'.", 502);
  }
  return ok(res, { email: user.email }, "Registered successfully! Please verify your email", 201);
};

/* ----------------------------- VERIFY EMAIL ---------------------------- */
export const verifyEmailController = async (req, res) => {
  const email = normEmail(req.body.email);
  const otp = String(req.body.otp || "").trim();
  if (!email || !otp) return bad(res, "Provide email and code");

  const user = await UserModel.findOne({ email }).select("+otp +otpExpires");
  if (!user) return bad(res, "User not found");
  if (!user.otp || hashOtp(otp) !== user.otp) return bad(res, "Invalid code");
  if (!user.otpExpires || user.otpExpires < Date.now()) return bad(res, "Code expired, request a new one");

  user.verify_email = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();
  return ok(res, {}, "Email verified successfully");
};

export const resendOtpController = async (req, res) => {
  const email = normEmail(req.body.email);
  const user = await UserModel.findOne({ email });
  // Same answer whether or not the account exists (prevents email enumeration)
  if (user && !user.verify_email) {
    const otp = generateOtp();
    user.otp = hashOtp(otp);
    user.otpExpires = new Date(Date.now() + OTP_MINUTES * 60 * 1000);
    await user.save();
    await sendOtpEmail(user, otp, "verify");
  }
  return ok(res, {}, "If the account exists, a new code was sent");
};

/* -------------------------------- LOGIN -------------------------------- */
export const loginUserController = async (req, res) => {
  const email = normEmail(req.body.email);
  const password = String(req.body.password || "");
  if (!email || !password) return bad(res, "Provide email and password");

  const user = await UserModel.findOne({ email }).select("+password +refresh_tokens");
  if (!user || !(await bcryptjs.compare(password, user.password))) {
    return bad(res, "Invalid email or password", 401);
  }
  if (user.status !== "Active") return bad(res, "Your account is not active. Contact admin", 403);
  if (!user.verify_email) return bad(res, "Please verify your email first", 403);

  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  user.refresh_tokens = [...(user.refresh_tokens || []), hashToken(refreshToken)].slice(-5);
  user.last_login_date = new Date();
  await user.save();

  return ok(res, { accessToken, refreshToken, user: publicUser(user) }, "Login successful");
};

export const refreshTokenController = async (req, res) => {
  const token = req.body.refreshToken;
  if (!token) return bad(res, "Missing refresh token", 401);
  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY_REFRESH_TOKEN);
  } catch {
    return bad(res, "Session expired, please login again", 401);
  }
  const user = await UserModel.findById(payload.id).select("+refresh_tokens");
  if (!user || !user.refresh_tokens?.includes(hashToken(token)) || user.status !== "Active") {
    return bad(res, "Session expired, please login again", 401);
  }
  return ok(res, { accessToken: signAccessToken(user._id) });
};

export const logoutController = async (req, res) => {
  // sign out this device only (other devices stay logged in)
  const token = req.body?.refreshToken;
  if (token) {
    await UserModel.updateOne({ _id: req.user._id }, { $pull: { refresh_tokens: hashToken(token) } });
  }
  return ok(res, {}, "Logged out");
};

/* --------------------------- FORGOT / RESET ---------------------------- */
export const forgotPasswordController = async (req, res) => {
  const email = normEmail(req.body.email);
  const user = await UserModel.findOne({ email });
  if (user && user.status === "Active") {
    const otp = generateOtp();
    user.forgot_password_otp = hashOtp(otp);
    user.forgot_password_expiry = new Date(Date.now() + OTP_MINUTES * 60 * 1000);
    await user.save();
    await sendOtpEmail(user, otp, "reset");
  }
  return ok(res, {}, "If the account exists, a code was sent to the email");
};

export const verifyForgotOtpController = async (req, res) => {
  const email = normEmail(req.body.email);
  const otp = String(req.body.otp || "").trim();
  const user = await UserModel.findOne({ email }).select("+forgot_password_otp +forgot_password_expiry");
  if (!user || !user.forgot_password_otp || hashOtp(otp) !== user.forgot_password_otp) {
    return bad(res, "Invalid code");
  }
  if (!user.forgot_password_expiry || user.forgot_password_expiry < Date.now()) {
    return bad(res, "Code expired, request a new one");
  }
  user.forgot_password_otp = null;
  user.forgot_password_expiry = null;
  await user.save();
  return ok(res, { resetToken: signResetToken(user._id) }, "Code verified");
};

export const resetPasswordController = async (req, res) => {
  const { resetToken } = req.body;
  const newPassword = String(req.body.newPassword || "");
  if (newPassword.length < 8) return bad(res, "Password must be at least 8 characters");
  let payload;
  try {
    payload = jwt.verify(resetToken, process.env.SECRET_KEY_ACCESS_TOKEN);
  } catch {
    return bad(res, "Reset link expired, start again", 401);
  }
  if (payload.purpose !== "reset") return bad(res, "Invalid token", 401);

  const user = await UserModel.findById(payload.id).select("+password +refresh_tokens");
  if (!user) return bad(res, "User not found", 404);
  user.password = await bcryptjs.hash(newPassword, 10);
  user.refresh_tokens = []; // log out every device
  await user.save();
  return ok(res, {}, "Password updated, please login");
};

/* ------------------------------- PROFILE ------------------------------- */
export const getMeController = async (req, res) => ok(res, { user: publicUser(req.user) });

export const updateMeController = async (req, res) => {
  const { name, mobile } = req.body;
  const user = req.user;
  if (name !== undefined) {
    if (!String(name).trim()) return bad(res, "Name cannot be empty");
    user.name = String(name).trim();
  }
  if (mobile !== undefined) user.mobile = String(mobile).trim();
  await user.save();
  return ok(res, { user: publicUser(user) }, "Profile updated");
};

export const changePasswordController = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return bad(res, "Provide old and new password");
  if (String(newPassword).length < 8) return bad(res, "Password must be at least 8 characters");
  const user = await UserModel.findById(req.user._id).select("+password");
  if (!(await bcryptjs.compare(oldPassword, user.password))) return bad(res, "Old password is wrong");
  user.password = await bcryptjs.hash(newPassword, 10);
  await user.save();
  return ok(res, {}, "Password changed");
};

export const uploadAvatarController = async (req, res) => {
  if (!req.file) return bad(res, "Choose an image");
  req.user.avatar = await uploadBuffer(req.file, "avatars");
  await req.user.save();
  return ok(res, { user: publicUser(req.user) }, "Avatar updated");
};

/* -------------------------------- ADMIN -------------------------------- */
export const listUsersController = async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Number(req.query.limit) || 10);
  const search = String(req.query.search || "").trim();
  const filter = search
    ? { $or: [{ name: new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") }, { email: new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") }] }
    : {};
  const [users, total] = await Promise.all([
    UserModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    UserModel.countDocuments(filter),
  ]);
  return ok(res, { users: users.map(publicUser), total, page, pages: Math.ceil(total / limit) });
};

export const updateUserStatusController = async (req, res) => {
  const { status } = req.body;
  if (!["Active", "Inactive", "Suspended"].includes(status)) return bad(res, "Invalid status");
  if (String(req.params.id) === String(req.user._id)) return bad(res, "You cannot change your own status");
  const user = await UserModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!user) return bad(res, "User not found", 404);
  return ok(res, { user: publicUser(user) }, "Status updated");
};
