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
// Doctor Upload Directories
// =====================================================

const profilePath = path.join(uploadRoot, "doctors", "profile");

const galleryPath = path.join(uploadRoot, "doctors", "gallery");

// =====================================================
// Create Directories
// =====================================================

fs.mkdirSync(profilePath, {
  recursive: true,
});

fs.mkdirSync(galleryPath, {
  recursive: true,
});

// =====================================================
// Storage
// =====================================================

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "profileImage") {
      return cb(null, profilePath);
    }

    if (file.fieldname === "gallery") {
      return cb(null, galleryPath);
    }

    cb(new Error("Invalid upload field."));
  },

  filename(req, file, cb) {
    const filename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, filename);
  },
});

// =====================================================
// File Filter
// =====================================================

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    return cb(null, true);
  }

  cb(new Error("Only image files allowed"), false);
};

// =====================================================
// Upload
// =====================================================

module.exports = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
