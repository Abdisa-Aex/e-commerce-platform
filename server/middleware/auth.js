import jwt from "jsonwebtoken";
import UserModel from "../models/Users.model.js";

const fail = (res, code, message) =>
  res.status(code).json({ success: false, error: true, message });

/** Requires a valid access token (Authorization: Bearer <token>) */
export const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return fail(res, 401, "Please login first");

    let payload;
    try {
      payload = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    } catch {
      return fail(res, 401, "Session expired, please login again");
    }
    if (payload.purpose) return fail(res, 401, "Invalid token");

    const user = await UserModel.findById(payload.id);
    if (!user) return fail(res, 401, "User not found");
    if (user.status !== "Active") return fail(res, 403, "Your account is not active. Contact admin");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "ADMIN") return fail(res, 403, "Admin access only");
  next();
};
