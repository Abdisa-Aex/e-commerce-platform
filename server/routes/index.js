import { Router } from "express";
import userRoutes from "./user.route.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import * as catalog from "../controllers/catalog.controller.js";
import * as shop from "../controllers/shopper.controller.js";
import * as order from "../controllers/order.controller.js";

const api = Router();

api.use("/users", userRoutes);

/* public store settings used by the checkout page */
api.get("/config", (req, res) =>
  res.json({
    success: true,
    shippingFee: Number(process.env.SHIPPING_FEE || 0),
    onlinePayment: Boolean(process.env.CHAPA_SECRET_KEY),
    currency: "ETB",
  })
);

/* categories (public read, admin write) */
api.get("/categories", catalog.listCategories);
api.post("/categories", requireAuth, requireAdmin, upload.single("image"), catalog.createCategory);
api.put("/categories/:id", requireAuth, requireAdmin, upload.single("image"), catalog.updateCategory);
api.delete("/categories/:id", requireAuth, requireAdmin, catalog.deleteCategory);

/* products */
api.get("/products", catalog.listProducts);
api.get("/products/:id", catalog.getProduct);
api.post("/products", requireAuth, requireAdmin, upload.array("images", 8), catalog.createProduct);
api.put("/products/:id", requireAuth, requireAdmin, upload.array("images", 8), catalog.updateProduct);
api.delete("/products/:id", requireAuth, requireAdmin, catalog.deleteProduct);

/* home slider */
api.get("/slides", catalog.listSlides);
api.post("/slides", requireAuth, requireAdmin, upload.single("image"), catalog.createSlide);
api.delete("/slides/:id", requireAuth, requireAdmin, catalog.deleteSlide);

/* cart */
api.get("/cart", requireAuth, shop.getCart);
api.post("/cart", requireAuth, shop.addToCart);
api.delete("/cart", requireAuth, shop.clearCart);
api.patch("/cart/:id", requireAuth, shop.updateCartItem);
api.delete("/cart/:id", requireAuth, shop.removeCartItem);

/* wishlist */
api.get("/wishlist", requireAuth, shop.getWishlist);
api.post("/wishlist", requireAuth, shop.addToWishlist);
api.delete("/wishlist/:productId", requireAuth, shop.removeFromWishlist);

/* addresses */
api.get("/address", requireAuth, shop.listAddresses);
api.post("/address", requireAuth, shop.createAddress);
api.put("/address/:id", requireAuth, shop.updateAddress);
api.delete("/address/:id", requireAuth, shop.deleteAddress);

/* orders */
api.post("/orders", requireAuth, order.createOrder);
api.get("/orders/mine", requireAuth, order.myOrders);
api.get("/orders/chapa/verify/:txRef", requireAuth, order.chapaVerify);
api.get("/orders/admin/all", requireAuth, requireAdmin, order.adminListOrders);
api.patch("/orders/admin/:id", requireAuth, requireAdmin, order.adminUpdateOrder);
api.get("/orders/:id", requireAuth, order.getOrder);
api.patch("/orders/:id/cancel", requireAuth, order.cancelMyOrder);
api.post("/orders/:id/chapa/init", requireAuth, order.chapaInit);

/* admin dashboard */
api.get("/admin/stats", requireAuth, requireAdmin, order.adminStats);

export default api;
