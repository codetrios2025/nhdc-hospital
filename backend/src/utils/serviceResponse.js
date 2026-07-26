const buildImageUrl = require("./imageUrl");

const serviceResponse = (service) => {
  if (!service) return null;

  const data =
    typeof service.toObject === "function"
      ? service.toObject()
      : { ...service };

  data.imageUrl = buildImageUrl("services", data.image);

  data.gallery = (data.gallery || []).map((item) => ({
    ...item,
    imageUrl: buildImageUrl("services/gallery", item.image),
  }));

  return data;
};

module.exports = serviceResponse;
