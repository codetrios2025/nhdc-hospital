const buildImageUrl = (folder, filename) => {
  if (!filename) return "";

  const baseUrl =
    process.env.APP_URL || `http://localhost:${process.env.PORT || 5005}`;

  return `${baseUrl}/uploads/${folder}/${filename}`;
};

module.exports = buildImageUrl;
