import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import mongoose from "mongoose";
import connectDB from "./config/connectDb.js";
import api from "./routes/index.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

// Local development convenience: sensible defaults so no .env file is needed.
// (Never used in production: Render sets NODE_ENV=production.)
if (process.env.NODE_ENV !== "production") {
  process.env.MONGODB_URI ||= "mongodb://127.0.0.1:27017/spices-gold";
  process.env.SECRET_KEY_ACCESS_TOKEN ||= "dev-only-access-secret-change-in-production";
  process.env.SECRET_KEY_REFRESH_TOKEN ||= "dev-only-refresh-secret-change-in-production";
  process.env.CLIENT_URL ||= "http://localhost:5173,http://localhost:5174";
}

const required = [
  "MONGODB_URI",
  "SECRET_KEY_ACCESS_TOKEN",
  "SECRET_KEY_REFRESH_TOKEN",
];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`❌ Missing environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const app = express();
const isProd = process.env.NODE_ENV === "production";

// Render / Railway / Vercel sit behind a proxy: needed for correct client IPs (rate limiting)
app.set("trust proxy", 1);

// Allowed browser origins: CLIENT_URL may hold several, comma separated
//   CLIENT_URL=https://shop.vercel.app,https://admin.vercel.app
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((s) => s.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // no Origin header = curl / server-to-server / same-origin: allow
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      // in development allow any localhost port
      if (!isProd && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return cb(null, true);
      return cb(Object.assign(new Error("Not allowed by CORS"), { status: 403 }));
    },
  })
);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
if (!isProd) app.use(morgan("dev"));
else app.use(morgan("tiny"));

app.get("/", (req, res) => res.json({ message: "API is running" }));
app.get("/health", (req, res) =>
  res.status(mongoose.connection.readyState === 1 ? 200 : 503).json({
    status: mongoose.connection.readyState === 1 ? "ok" : "db-disconnected",
  })
);

app.use("/api", apiLimiter, api);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)))
  .catch((err) => {
    console.error("❌ Failed to start:", err.message);
    process.exit(1);
  });
