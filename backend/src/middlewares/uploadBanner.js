const multer = require("multer");
const path = require("path");
const fs = require("fs");

// =====================================================
// Persistent Upload Root
// =====================================================

const uploadRoot = process.env.UPLOAD_ROOT
  ? path.resolve(process.env.UPLOAD_ROOT)
  : path.resolve(__dirname, "../uploads");

// =====================================================
// Banner Upload Directory
// =====================================================

const uploadPath = path.join(uploadRoot, "temp");

// =====================================================
// Create Temp Folder
// =====================================================

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}

// =====================================================
// Storage
// =====================================================

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    const extension = path.extname(file.originalname);

    const filename =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + extension;

    cb(null, filename);
  },
});

// =====================================================
// File Filter
// =====================================================

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error("Only JPG, JPEG, PNG and WEBP images are allowed."),
      false,
    );
  }

  cb(null, true);
};

// =====================================================
// Upload
// =====================================================

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = upload;
