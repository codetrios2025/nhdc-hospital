const updateDoctorFormData = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (key === "profileImage") return;

    if (key === "gallery") return;

    formData.append(key, data[key] ?? "");
  });

  if (data.profileImage instanceof File) {
    formData.append("profileImage", data.profileImage);
  }

  if (data.gallery) {
    data.gallery.forEach((file) => {
      if (file instanceof File) {
        formData.append("gallery", file);
      }
    });
  }

  return formData;
};

export default updateDoctorFormData;
