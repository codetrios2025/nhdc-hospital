import apiClient from "../../../api/client/apiClient";

const BASE_URL = "/departments";

const departmentApi = {
  getDepartments: (params = {}) => apiClient.get(BASE_URL, params),

  getDepartment: (id) => apiClient.get(`${BASE_URL}/${id}`),

  createDepartment: (data) => apiClient.post(BASE_URL, data),

  updateDepartment: (id, data) => apiClient.put(`${BASE_URL}/${id}`, data),

  deleteDepartment: (id) => apiClient.delete(`${BASE_URL}/${id}`),

  getDropdown: () => apiClient.get(`${BASE_URL}/dropdown`),

  getStatistics: () => apiClient.get(`${BASE_URL}/statistics`),
};

export default departmentApi;
