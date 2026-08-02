import apiClient from "../../../api/client/apiClient";

const BASE_URL = "/diagnostic-services";

const diagnosticApi = {
  getDiagnostics(params = {}) {
    return apiClient.get(BASE_URL, params);
  },

  getDiagnostic(id) {
    return apiClient.get(`${BASE_URL}/${id}`);
  },

  createDiagnostic(data) {
    return apiClient.post(BASE_URL, data);
  },

  updateDiagnostic(id, data) {
    return apiClient.put(`${BASE_URL}/${id}`, data);
  },

  deleteDiagnostic(id) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  },

  updateStatus(id, status) {
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

export default diagnosticApi;
