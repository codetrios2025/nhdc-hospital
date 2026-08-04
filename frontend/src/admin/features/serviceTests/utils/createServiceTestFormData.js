const createServiceTestFormData = (values) => {
  const formData = new FormData();

  formData.append("service", values.service || "");

  formData.append("testName", values.testName || "");

  formData.append("subtitle", values.subtitle || "");

  formData.append("description", values.description || "");

  formData.append("imageAlt", values.imageAlt || "");

  formData.append("displayOrder", values.displayOrder || 1);

  formData.append("status", values.status);

  if (values.image instanceof File) {
    formData.append("image", values.image);
  }

  return formData;
};

export default createServiceTestFormData;
