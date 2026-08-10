const fs = require("fs");
const path = require("path");

/**
 * Get the persistent upload root.
 *
 * Production:
 * /home/u394996505/public_html/uploads
 *
 * Local:
 * backend/src/uploads
 */
const getUploadRoot = () => {
  return process.env.UPLOAD_ROOT
    ? path.resolve(process.env.UPLOAD_ROOT)
    : path.resolve(__dirname, "../uploads");
};

/**
 * Delete a file if it exists.
 *
 * filePath should be relative to the upload root.
 *
 * Example:
 * doctors/profile/doctor.webp
 *
 * Production resolves to:
 * /home/u394996505/public_html/uploads/doctors/profile/doctor.webp
 */
exports.deleteFile = (filePath) => {
  try {
    if (!filePath) return;

    const absolutePath = path.join(getUploadRoot(), filePath);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);

      console.log("File deleted:", absolutePath);
    }
  } catch (error) {
    console.error("Delete File Error:", error.message);
  }
};

/**
 * Generate public file URL.
 *
 * Example:
 * getFileUrl(
 *   "doctors/profile",
 *   "doctor.webp"
 * )
 *
 * Returns:
 * https://api.namokarhospitaldeoli.com/uploads/doctors/profile/doctor.webp
 */
exports.getFileUrl = (folder, fileName) => {
  if (!fileName) return "";

  const appUrl = (
    process.env.APP_URL || `http://localhost:${process.env.PORT || 5005}`
  ).replace(/\/+$/, "");

  return `${appUrl}/uploads/${folder}/${fileName}`;
};
