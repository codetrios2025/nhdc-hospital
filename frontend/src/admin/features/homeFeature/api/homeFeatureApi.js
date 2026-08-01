import apiClient from "../../../api/client/apiClient";

const BASE_URL = "/home-features";

const homeFeatureApi = {
  getHomeFeatures(params = {}) {
    return apiClient.get(BASE_URL, params);
  },

  getHomeFeature(id) {
    return apiClient.get(`${BASE_URL}/${id}`);
  },

  createHomeFeature(data) {
    return apiClient.post(BASE_URL, data);
  },

  updateHomeFeature(id, data) {
    return apiClient.put(`${BASE_URL}/${id}`, data);
  },

  deleteHomeFeature(id) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  },

  changeStatus(id, status) {
    return apiClient.patch(`${BASE_URL}/${id}/status`, {
      status,
    });
  },

  updateDisplayOrder(id, displayOrder) {
    return apiClient.patch(`${BASE_URL}/${id}/display-order`, {
      displayOrder,
    });
  },
};

export default homeFeatureApi;
