const createServiceFormData = (data, gallery = []) => {
  const formData = new FormData();

  formData.append("title", data.title || "");
  formData.append("department", data.department || "");
  formData.append("themeColor", data.themeColor || "");
  formData.append("displayOrder", data.displayOrder || 1);
  formData.append("icon", data.icon || "");
  formData.append("shortDescription", data.shortDescription || "");
  formData.append("description", data.description || "");
  formData.append("seoTitle", data.seoTitle || "");
  formData.append("seoDescription", data.seoDescription || "");

  formData.append("status", String(data.status));
  formData.append("showOnHome", String(data.showOnHome));
  formData.append("isFeatured", String(data.isFeatured));

  /*
  ------------------------------------
  SEO Keywords
  ------------------------------------
  */

  if (data.seoKeywords) {
    data.seoKeywords
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .forEach((keyword) => {
        formData.append("seoKeywords[]", keyword);
      });
  }

  /*
  ------------------------------------
  Features
  ------------------------------------
  */

  if (Array.isArray(data.features)) {
    data.features
      .filter((item) => item && item.trim() !== "")
      .forEach((feature) => {
        formData.append("features[]", feature);
      });
  }

  /*
  ------------------------------------
  Main Image
  ------------------------------------
  */

  if (data.image instanceof File) {
    formData.append("image", data.image);
  }

  /*
  ------------------------------------
  Gallery Images
  ------------------------------------
  */

  if (Array.isArray(gallery)) {
    gallery.forEach((file) => {
      if (file instanceof File) {
        formData.append("gallery", file);
      }
    });
  }

  return formData;
};

export default createServiceFormData;
