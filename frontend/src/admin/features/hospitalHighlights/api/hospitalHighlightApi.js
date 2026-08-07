import apiClient from "../../../api/client/apiClient";

const ENDPOINT = "/hospital-highlights";

const hospitalHighlightApi = {
  getAll(params = {}) {
    return apiClient.get(ENDPOINT, { params });
  },

  getById(id) {
    return apiClient.get(`${ENDPOINT}/${id}`);
  },

  create(data) {
    return apiClient.post(ENDPOINT, data);
  },

  update(id, data) {
    return apiClient.put(`${ENDPOINT}/${id}`, data);
  },

  delete(id) {
    return apiClient.delete(`${ENDPOINT}/${id}`);
  },

  changeStatus(id, isActive) {
    return apiClient.patch(`${ENDPOINT}/status/${id}`, {
      isActive,
    });
  },
};

export default hospitalHighlightApi;
