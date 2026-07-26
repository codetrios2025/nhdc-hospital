const createDoctorFormData = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (key !== "profileImage" && key !== "gallery") {
      formData.append(key, data[key] ?? "");
    }
  });

  if (data.profileImage) {
    formData.append("profileImage", data.profileImage);
  }

  if (data.gallery?.length) {
    data.gallery.forEach((image) => {
      formData.append("gallery", image);
    });
  }

  return formData;
};

export default createDoctorFormData;
