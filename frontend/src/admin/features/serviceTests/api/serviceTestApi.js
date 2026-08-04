import apiClient from "../../../api/client/apiClient";

const BASE_URL = "/service-tests";

const serviceTestApi = {
  /*
  |--------------------------------------------------------------------------
  | List
  |--------------------------------------------------------------------------
  */

  getServiceTests(params = {}) {
    return apiClient.get(BASE_URL, params);
  },

  /*
  |--------------------------------------------------------------------------
  | Details
  |--------------------------------------------------------------------------
  */

  getServiceTest(id) {
    return apiClient.get(`${BASE_URL}/${id}`);
  },

  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  createServiceTest(data) {
    return apiClient.post(BASE_URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  updateServiceTest(id, data) {
    return apiClient.put(`${BASE_URL}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  deleteServiceTest(id) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  },

  /*
  |--------------------------------------------------------------------------
  | Status
  |--------------------------------------------------------------------------
  */

  updateStatus(id, status) {
    return apiClient.patch(`${BASE_URL}/status/${id}`, {
      status,
    });
  },

  /*
  |--------------------------------------------------------------------------
  | Display Order
  |--------------------------------------------------------------------------
  */

  updateDisplayOrder(id, displayOrder) {
    return apiClient.patch(`${BASE_URL}/display-order/${id}`, {
      displayOrder,
    });
  },

  /*
  |--------------------------------------------------------------------------
  | Service Wise
  |--------------------------------------------------------------------------
  */

  getByService(serviceId) {
    return apiClient.get(`${BASE_URL}/service/${serviceId}`);
  },
};

export default serviceTestApi;
