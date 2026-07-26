import apiClient from "../../../api/client/apiClient";

const BASE_URL = "/services";

const serviceApi = {
  getServices(params = {}) {
    return apiClient.get(BASE_URL, params);
  },

  getService(id) {
    return apiClient.get(`${BASE_URL}/${id}`);
  },

  createService(formData) {
    return apiClient.post(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateService(id, formData) {
    return apiClient.put(`${BASE_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteService(id) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  },

  /*
------------------------------------
Delete Gallery Image
------------------------------------
*/

  deleteGalleryImage(serviceId, imageId) {
    return apiClient.delete(`${BASE_URL}/${serviceId}/gallery/${imageId}`);
  },

  changeStatus(id, status) {
    return apiClient.patch(`${BASE_URL}/status/${id}`, {
      status,
    });
  },

  toggleFeatured(id, isFeatured) {
    return apiClient.patch(`${BASE_URL}/featured/${id}`, {
      isFeatured,
    });
  },

  toggleHome(id, showOnHome) {
    return apiClient.patch(`${BASE_URL}/home/${id}`, {
      showOnHome,
    });
  },

  updateDisplayOrder(id, displayOrder) {
    return apiClient.patch(`${BASE_URL}/order/${id}`, {
      displayOrder,
    });
  },
};

export default serviceApi;
