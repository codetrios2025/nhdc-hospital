import apiClient from "../../../api/client/apiClient";

const doctorApi = {
  getDoctors(params = {}) {
    return apiClient.get("/doctors", params);
  },

  getDoctor(id) {
    return apiClient.get(`/doctors/${id}`);
  },

  createDoctor(formData) {
    return apiClient.post("/doctors", formData);
  },

  updateDoctor(id, formData) {
    return apiClient.put(`/doctors/${id}`, formData);
  },

  deleteDoctor(id) {
    return apiClient.delete(`/doctors/${id}`);
  },

  changeStatus(id, isActive) {
    return apiClient.patch(`/doctors/${id}/status`, {
      isActive,
    });
  },

  toggleFeatured(id, featured) {
    return apiClient.patch(`/doctors/${id}/featured`, {
      featured,
    });
  },
};

export default doctorApi;
