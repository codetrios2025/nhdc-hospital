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
// Video Upload Directories
// =====================================================

const thumbnailPath = path.join(uploadRoot, "videos", "thumbnails");

const videoPath = path.join(uploadRoot, "videos", "files");

// =====================================================
// Create Directories
// =====================================================

fs.mkdirSync(thumbnailPath, {
  recursive: true,
});

fs.mkdirSync(videoPath, {
  recursive: true,
});

// =====================================================
// Storage
// =====================================================

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "thumbnail") {
      return cb(null, thumbnailPath);
    }

    if (file.fieldname === "videoFile") {
      return cb(null, videoPath);
    }

    cb(new Error("Invalid upload field."));
  },

  filename(req, file, cb) {
    const filename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1000000000) +
      path.extname(file.originalname);

    cb(null, filename);
  },
});

// =====================================================
// File Filter
// =====================================================

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "thumbnail") {
    if (file.mimetype.startsWith("image")) {
      return cb(null, true);
    }

    return cb(new Error("Thumbnail must be image."));
  }

  if (file.fieldname === "videoFile") {
    if (file.mimetype.startsWith("video")) {
      return cb(null, true);
    }

    return cb(new Error("Only video files allowed."));
  }

  cb(null, false);
};

// =====================================================
// Upload
// =====================================================

module.exports = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 300 * 1024 * 1024,
  },
});
