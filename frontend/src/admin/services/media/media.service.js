import apiClient from "../../api/client/apiClient";
import API_ENDPOINTS from "../../constants/apiEndpoints";

const mediaService = {
  upload(formData) {
    return apiClient.post(`${API_ENDPOINTS.MEDIA}/upload`, formData);
  },

  delete(id) {
    return apiClient.delete(`${API_ENDPOINTS.MEDIA}/${id}`);
  },

  list(params) {
    return apiClient.get(API_ENDPOINTS.MEDIA, params);
  },
};

export default mediaService;
