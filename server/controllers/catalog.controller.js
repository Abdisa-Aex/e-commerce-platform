import mongoose from "mongoose";
import CategoryModel from "../models/category.model.js";
import ProductModel from "../models/product.model.js";
import SlideModel from "../models/slide.model.js";
import { uploadBuffer, uploadMany } from "../config/cloudinary.js";

const ok = (res, data = {}, message = "", status = 200) =>
  res.status(status).json({ success: true, error: false, message, ...data });
const bad = (res, message, status = 400) =>
  res.status(status).json({ success: false, error: true, message });
const validId = (id) => mongoose.isValidObjectId(id);
const escapeRegex = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* ----------------------------- CATEGORIES ----------------------------- */
export const listCategories = async (req, res) => {
  const all = await CategoryModel.find().sort({ createdAt: 1 }).lean();
  const parents = all.filter((c) => !c.parentId);
  const tree = parents.map((p) => ({
    ...p,
    children: all.filter((c) => String(c.parentId) === String(p._id)),
  }));
  return ok(res, { categories: tree, flat: all });
};

export const createCategory = async (req, res) => {
  const name = String(req.body.name || "").trim();
  if (!name) return bad(res, "Provide category name");
  let parentId = req.body.parentId || null;
  if (parentId) {
    if (!validId(parentId) || !(await CategoryModel.exists({ _id: parentId }))) {
      return bad(res, "Parent category not found");
    }
  } else parentId = null;
  const image = req.file ? await uploadBuffer(req.file, "categories") : "";
  const category = await CategoryModel.create({ name, parentId, image });
  return ok(res, { category }, "Category created", 201);
};

export const updateCategory = async (req, res) => {
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  const update = {};
  if (req.body.name) update.name = String(req.body.name).trim();
  if (req.file) update.image = await uploadBuffer(req.file, "categories");
  const category = await CategoryModel.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!category) return bad(res, "Category not found", 404);
  return ok(res, { category }, "Category updated");
};

export const deleteCategory = async (req, res) => {
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  const inUse = await ProductModel.exists({
    $or: [{ category: req.params.id }, { subCategory: req.params.id }],
  });
  if (inUse) return bad(res, "Cannot delete: products use this category", 409);
  // remove its sub categories too
  await CategoryModel.deleteMany({ $or: [{ _id: req.params.id }, { parentId: req.params.id }] });
  return ok(res, {}, "Category deleted");
};

/* ------------------------------ PRODUCTS ------------------------------ */
export const listProducts = async (req, res) => {
  const q = req.query;
  const filter = {};
  if (q.category && validId(q.category)) filter.category = q.category;
  if (q.subCategory && validId(q.subCategory)) filter.subCategory = q.subCategory;
  if (q.featured === "true") filter.isFeatured = true;
  if (q.brand) filter.brand = { $in: String(q.brand).split(",") };
  if (q.rating) filter.rating = { $gte: Number(q.rating) || 0 };
  if (q.minPrice || q.maxPrice) {
    filter.price = {};
    if (q.minPrice) filter.price.$gte = Number(q.minPrice) || 0;
    if (q.maxPrice) filter.price.$lte = Number(q.maxPrice) || 0;
  }
  if (q.search) {
    const rx = new RegExp(escapeRegex(String(q.search).trim()), "i");
    filter.$or = [{ name: rx }, { brand: rx }];
  }

  const sortMap = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    "name-asc": { name: 1 },
    "name-desc": { name: -1 },
    newest: { createdAt: -1 },
    popular: { sales: -1 },
  };
  const sort = sortMap[q.sort] || { createdAt: -1 };
  const page = Math.max(1, Number(q.page) || 1);
  const limit = Math.min(60, Number(q.limit) || 12);

  const [products, total] = await Promise.all([
    ProductModel.find(filter)
      .populate("category", "name")
      .populate("subCategory", "name")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    ProductModel.countDocuments(filter),
  ]);
  return ok(res, { products, total, page, pages: Math.ceil(total / limit) });
};

export const getProduct = async (req, res) => {
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  const product = await ProductModel.findById(req.params.id)
    .populate("category", "name")
    .populate("subCategory", "name")
    .lean();
  if (!product) return bad(res, "Product not found", 404);
  return ok(res, { product });
};

const productFields = (b) => {
  const f = {};
  for (const k of ["name", "description", "brand"]) if (b[k] !== undefined) f[k] = String(b[k]).trim();
  for (const k of ["price", "oldPrice", "discount", "countInStock", "rating"]) {
    if (b[k] !== undefined && b[k] !== "") f[k] = Number(b[k]);
  }
  if (b.category) f.category = b.category;
  if (b.subCategory !== undefined) f.subCategory = b.subCategory || undefined;
  if (b.isFeatured !== undefined) f.isFeatured = b.isFeatured === true || b.isFeatured === "true";
  if (b.sizes !== undefined) {
    f.sizes = Array.isArray(b.sizes) ? b.sizes : String(b.sizes).split(",").map((s) => s.trim()).filter(Boolean);
  }
  return f;
};

export const createProduct = async (req, res) => {
  const fields = productFields(req.body);
  if (!fields.name) return bad(res, "Provide product name");
  if (fields.price === undefined || Number.isNaN(fields.price)) return bad(res, "Provide a valid price");
  if (fields.category && !validId(fields.category)) return bad(res, "Invalid category");
  const images = await uploadMany(req.files || [], "products");
  const product = await ProductModel.create({ ...fields, images });
  return ok(res, { product }, "Product created", 201);
};

export const updateProduct = async (req, res) => {
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  const product = await ProductModel.findById(req.params.id);
  if (!product) return bad(res, "Product not found", 404);
  Object.assign(product, productFields(req.body));
  // keep existing images the admin didn't remove, then add new uploads
  if (req.body.keepImages !== undefined) {
    const keep = Array.isArray(req.body.keepImages) ? req.body.keepImages : [req.body.keepImages];
    product.images = product.images.filter((img) => keep.includes(img));
  }
  if (req.files?.length) product.images.push(...(await uploadMany(req.files, "products")));
  await product.save();
  return ok(res, { product }, "Product updated");
};

export const deleteProduct = async (req, res) => {
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  const product = await ProductModel.findByIdAndDelete(req.params.id);
  if (!product) return bad(res, "Product not found", 404);
  return ok(res, {}, "Product deleted");
};

/* ------------------------------- SLIDES ------------------------------- */
export const listSlides = async (req, res) => {
  const slides = await SlideModel.find().sort({ createdAt: -1 }).lean();
  return ok(res, { slides });
};

export const createSlide = async (req, res) => {
  if (!req.file) return bad(res, "Choose a slide image");
  const image = await uploadBuffer(req.file, "slides");
  const slide = await SlideModel.create({ image, title: req.body.title || "", link: req.body.link || "" });
  return ok(res, { slide }, "Slide added", 201);
};

export const deleteSlide = async (req, res) => {
  if (!validId(req.params.id)) return bad(res, "Invalid id");
  await SlideModel.findByIdAndDelete(req.params.id);
  return ok(res, {}, "Slide deleted");
};
