// Adds demo categories, products and slides so the shop is not empty (no Cloudinary needed).
//   npm run seed
import "dotenv/config";
import mongoose from "mongoose";
import CategoryModel from "../models/category.model.js";
import ProductModel from "../models/product.model.js";
import SlideModel from "../models/slide.model.js";

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing");
const img = (seed, w = 600, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

await mongoose.connect(process.env.MONGODB_URI);
if (await ProductModel.countDocuments()) {
  console.log("Products already exist - nothing seeded.");
  await mongoose.disconnect();
  process.exit(0);
}

const names = ["Spices", "Coffee", "Honey", "Grains"];
const cats = {};
for (const n of names) cats[n] = await CategoryModel.create({ name: n, image: img(n, 300, 300) });

const items = [
  ["Berbere Spice Mix", "Spices", 250, 300], ["Turmeric Powder", "Spices", 180, 0],
  ["Black Pepper", "Spices", 220, 260], ["Cinnamon Sticks", "Spices", 150, 0],
  ["Yirgacheffe Coffee", "Coffee", 480, 550], ["Sidamo Coffee", "Coffee", 450, 0],
  ["Harar Coffee", "Coffee", 520, 600], ["Pure Forest Honey", "Honey", 650, 750],
  ["White Honey", "Honey", 700, 0], ["Teff Flour", "Grains", 320, 380],
  ["Red Lentils", "Grains", 140, 0], ["Chickpeas", "Grains", 120, 150],
];
for (const [i, [name, cat, price, oldPrice]] of items.entries()) {
  await ProductModel.create({
    name, category: cats[cat]._id, price, oldPrice,
    discount: oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0,
    description: `${name} - fresh, high quality, carefully packed.`, brand: "Spices Gold",
    images: [img(`p${i}a`), img(`p${i}b`)], countInStock: 50,
    rating: 4 + (i % 2) * 0.5, isFeatured: i < 6, sizes: ["250g", "500g", "1kg"],
  });
}
for (const [i, t] of ["Fresh Ethiopian Spices", "Premium Coffee", "Pure Honey"].entries())
  await SlideModel.create({ image: img(`slide${i}`, 1400, 500), title: t });

console.log("Seeded: 4 categories, 12 products, 3 slides.");
await mongoose.disconnect();
