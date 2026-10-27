import { v2 as cloudinary } from "cloudinary";

let configured = false;
const configure = () => {
  if (configured) return;
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Image upload is not configured (missing CLOUDINARY_* environment variables)");
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
};

/** Uploads one in-memory file (from multer) and resolves with its https URL. */
export const uploadBuffer = (file, folder = "ecommerce") => {
  configure();
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        // f_auto/q_auto => smaller images for slow mobile connections
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => (error ? reject(error) : resolve(result.secure_url))
    );
    stream.end(file.buffer);
  });
};

export const uploadMany = (files = [], folder) =>
  Promise.all(files.map((f) => uploadBuffer(f, folder)));
