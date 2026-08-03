const createBannerFormData = (data) => {
  const formData = new FormData();

  /*
  |--------------------------------------------------------------------------
  | Banner Information
  |--------------------------------------------------------------------------
  */

  formData.append("title", data.title || "");
  formData.append("subtitle", data.subtitle || "");
  formData.append("description", data.description || "");
  formData.append("altText", data.altText || "");

  formData.append("primaryButtonText", data.primaryButtonText || "");

  formData.append("primaryButtonLink", data.primaryButtonLink || "");

  formData.append("secondaryButtonText", data.secondaryButtonText || "");

  formData.append("secondaryButtonLink", data.secondaryButtonLink || "");

  formData.append("displayOrder", data.displayOrder || 1);

  formData.append("status", data.status ?? true);

  /*
  |--------------------------------------------------------------------------
  | Features
  |--------------------------------------------------------------------------
  */

  const features = (data.features || []).map((feature, index) => ({
    _id: feature._id || null,

    title: feature.title || "",

    icon: feature.icon || "bi bi-check-circle-fill",

    sortOrder: feature.sortOrder || index + 1,
  }));

  formData.append("features", JSON.stringify(features));

  /*
  |--------------------------------------------------------------------------
  | Slides (Without Images)
  |--------------------------------------------------------------------------
  */

  const slides = (data.slides || []).map((slide, index) => ({
    _id: slide._id || null,

    desktopImage:
      typeof slide.desktopImage === "string" ? slide.desktopImage : "",

    mobileImage: typeof slide.mobileImage === "string" ? slide.mobileImage : "",

    displayOrder: slide.displayOrder || index + 1,

    status: slide.status ?? true,
  }));

  formData.append("slides", JSON.stringify(slides));

  /*
  |--------------------------------------------------------------------------
  | Upload New Images
  |--------------------------------------------------------------------------
  */

  (data.slides || []).forEach((slide, index) => {
    if (slide.desktopImage instanceof File) {
      formData.append(`slides[${index}][desktopImage]`, slide.desktopImage);
    }

    if (slide.mobileImage instanceof File) {
      formData.append(`slides[${index}][mobileImage]`, slide.mobileImage);
    }
  });

  return formData;
};

export default createBannerFormData;
