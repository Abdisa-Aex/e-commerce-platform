import multer from "multer";

// Files are kept in memory and streamed straight to Cloudinary (no disk writes,
// which matters on hosts with ephemeral file systems such as Render).
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 8 },
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpe?g|png|webp|gif|avif)$/.test(file.mimetype)) return cb(null, true);
    cb(new Error("Only image files (jpg, png, webp, gif) are allowed"));
  },
});

export default upload;
