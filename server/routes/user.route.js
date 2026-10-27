import { Router } from "express";
import * as c from "../controllers/user.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimit.js";
import upload from "../middleware/upload.js";

const r = Router();

// public (rate limited)
r.post("/register", authLimiter, c.registerUserController);
r.post("/verify-email", authLimiter, c.verifyEmailController);
r.post("/resend-otp", authLimiter, c.resendOtpController);
r.post("/login", authLimiter, c.loginUserController);
r.post("/refresh-token", authLimiter, c.refreshTokenController);
r.post("/forgot-password", authLimiter, c.forgotPasswordController);
r.post("/verify-forgot-otp", authLimiter, c.verifyForgotOtpController);
r.post("/reset-password", authLimiter, c.resetPasswordController);

// logged-in user
r.post("/logout", requireAuth, c.logoutController);
r.get("/me", requireAuth, c.getMeController);
r.put("/me", requireAuth, c.updateMeController);
r.put("/change-password", requireAuth, c.changePasswordController);
r.put("/avatar", requireAuth, upload.single("avatar"), c.uploadAvatarController);

// admin
r.get("/", requireAuth, requireAdmin, c.listUsersController);
r.patch("/:id/status", requireAuth, requireAdmin, c.updateUserStatusController);

export default r;
