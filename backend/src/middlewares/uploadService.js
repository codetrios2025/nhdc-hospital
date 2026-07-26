const multer = require("multer");
const path = require("path");
const fs = require("fs");

const servicePath = path.join(__dirname, "../uploads/services");

const galleryPath = path.join(__dirname, "../uploads/services/gallery");

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

    cb(null, servicePath);
  },

  filename(req, file, cb) {
    const ext = path.extname(file.originalname);

    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + ext);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
