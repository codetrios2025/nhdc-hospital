const multer = require("multer");
const path = require("path");
const fs = require("fs");

// =====================================================
// Persistent Upload Root
// =====================================================
//
// Production:
// UPLOAD_ROOT=/home/u394996505/public_html/uploads
//
// Local:
// backend/src/uploads
//
// =====================================================

const uploadRoot = process.env.UPLOAD_ROOT
  ? path.resolve(process.env.UPLOAD_ROOT)
  : path.resolve(__dirname, "../uploads");

// =====================================================
// Create Upload Directory
// =====================================================

if (!fs.existsSync(uploadRoot)) {
  fs.mkdirSync(uploadRoot, {
    recursive: true,
  });
}

// =====================================================
// Multer Storage
// =====================================================

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadRoot);
  },

  filename(req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// =====================================================
// File Filter
// =====================================================

const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "video/mp4",
  ];

  if (allowed.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("Unsupported file type"), false);
};

// =====================================================
// Multer
// =====================================================

module.exports = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});
