import apiClient from "../../api/client/apiClient";
import API_ENDPOINTS from "../../constants/apiEndpoints";

const dashboardService = {
  async getSummary() {
    return apiClient.get(API_ENDPOINTS.DASHBOARD);
  },
};

export default dashboardService;
