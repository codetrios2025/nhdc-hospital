const createBannerFormData = (data) => {
  const formData = new FormData();

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

  // Desktop Image
  if (data.desktopImage instanceof File) {
    formData.append("desktopImage", data.desktopImage);
  }

  // Mobile Image
  if (data.mobileImage instanceof File) {
    formData.append("mobileImage", data.mobileImage);
  }

  return formData;
};

export default createBannerFormData;
