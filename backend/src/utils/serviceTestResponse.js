module.exports = (item) => {
  if (!item) return null;

  const obj = item.toObject ? item.toObject() : item;

  return {
    ...obj,

    imageUrl: obj.image
      ? `${process.env.APP_URL}/uploads/service-tests/${obj.image}`
      : "",

    serviceTitle: obj.service?.title || "",

    serviceSlug: obj.service?.slug || "",
  };
};
