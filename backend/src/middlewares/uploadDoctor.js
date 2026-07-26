const multer = require("multer");

const path = require("path");

const fs = require("fs");

const profilePath = "src/uploads/doctors/profile";

const galleryPath = "src/uploads/doctors/gallery";

fs.mkdirSync(profilePath, { recursive: true });

fs.mkdirSync(galleryPath, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "profileImage") {
      cb(null, profilePath);
    } else {
      cb(null, galleryPath);
    }
  },

  filename(req, file, cb) {
    cb(
      null,

      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname),
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"));
  }
};

module.exports = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
