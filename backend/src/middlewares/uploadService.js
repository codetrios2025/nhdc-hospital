const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Persistent upload root on Hostinger
const uploadRoot =
  process.env.UPLOAD_ROOT || path.join(__dirname, "../uploads");

// Upload directories
const servicePath = path.join(uploadRoot, "services");
const galleryPath = path.join(uploadRoot, "services", "gallery");

// Create directories if they don't exist
if (!fs.existsSync(servicePath)) {
  fs.mkdirSync(servicePath, { recursive: true });
}

if (!fs.existsSync(galleryPath)) {
  fs.mkdirSync(galleryPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "image") {
      return cb(null, servicePath);
    }

    if (file.fieldname === "gallery") {
      return cb(null, galleryPath);
    }

    // bannerImage / bannerMobileImage
    return cb(null, servicePath);
  },

  filename(req, file, cb) {
    const ext = path.extname(file.originalname);

    const filename = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;

    cb(null, filename);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
