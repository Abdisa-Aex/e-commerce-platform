import rateLimit from "express-rate-limit";

const make = (windowMinutes, max, message) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: true, message },
  });

// Brute-force protection for login / OTP / password-reset endpoints
export const authLimiter = make(15, 20, "Too many attempts, please try again in 15 minutes");
// General protection for the whole API
export const apiLimiter = make(15, 600, "Too many requests, please slow down");
