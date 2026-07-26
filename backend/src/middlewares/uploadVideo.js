const multer = require("multer");
const path = require("path");
const fs = require("fs");

const thumbnailPath = "src/uploads/videos/thumbnails";
const videoPath = "src/uploads/videos/files";

fs.mkdirSync(thumbnailPath, { recursive: true });
fs.mkdirSync(videoPath, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "thumbnail") {
      cb(null, thumbnailPath);
    } else {
      cb(null, videoPath);
    }
  },

  filename(req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1000000000) +
        path.extname(file.originalname),
    );
  },
});

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

module.exports = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 300 * 1024 * 1024,
  },
});
