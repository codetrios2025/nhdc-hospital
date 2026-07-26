const fs = require("fs");
const path = require("path");

/**
 * Delete a file if it exists
 */
exports.deleteFile = (filePath) => {
  try {
    const absolutePath = path.resolve(filePath);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (error) {
    console.error("Delete File Error:", error.message);
  }
};

/**
 * Generate public file URL
 */
exports.getFileUrl = (folder, fileName) => {
  if (!fileName) return "";

  return `${process.env.APP_URL}/uploads/${folder}/${fileName}`;
};
