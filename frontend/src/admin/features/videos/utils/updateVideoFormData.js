const updateVideoFormData = (data) => {
  const formData = new FormData();

  const allowedFields = [
    "title",
    "category",
    "sourceType",
    "youtubeUrl",
    "embedCode",
    "externalUrl",
    "duration",
    "shortDescription",
    "description",
    "featured",
    "isActive",
    "showOnHome",
    "displayOrder",
    "seoTitle",
    "seoDescription",
    "seoKeywords",
  ];

  allowedFields.forEach((field) => {
    if (data[field] !== undefined && data[field] !== null) {
      formData.append(field, data[field]);
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

export default updateVideoFormData;
