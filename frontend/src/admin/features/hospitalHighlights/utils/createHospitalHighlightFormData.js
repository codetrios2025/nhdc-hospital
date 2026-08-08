const createHospitalHighlightFormData = (data) => {
  const formData = new FormData();

  formData.append("value", data.value);
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("icon", data.icon);
  formData.append("order", data.order);
  formData.append("isActive", data.isActive);

  return formData;
};

export default createHospitalHighlightFormData;
