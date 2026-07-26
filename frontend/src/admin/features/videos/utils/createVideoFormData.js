const createVideoFormData = (data) => {
  const formData = new FormData();

  // Fields allowed to be saved
  const allowedFields = [
    "title",
    "category",
    "sourceType",
    "youtubeUrl",
    "embedCode",
    "externalUrl",
    "shortDescription",
    "description",
    "featured",
    "isActive",
    "displayOrder",
    "duration",
    "metaTitle",
    "metaDescription",
    "metaKeywords",
  ];

  allowedFields.forEach((key) => {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });

  if (data.thumbnail instanceof File) {
    formData.append("thumbnail", data.thumbnail);
  }

  if (data.videoFile instanceof File) {
    formData.append("videoFile", data.videoFile);
  }

  return formData;
};

export default createVideoFormData;
