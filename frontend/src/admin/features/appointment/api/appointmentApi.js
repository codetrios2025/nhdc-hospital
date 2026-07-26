import apiClient from "../../../api/client/apiClient";

const BASE_URL = "/appointments";

const appointmentApi = {
  /*
  ------------------------------------
  List
  ------------------------------------
  */

  getAppointments(params = {}) {
    return apiClient.get(BASE_URL, {
      params,
    });
  },

  /*
  ------------------------------------
  Details
  ------------------------------------
  */

  getAppointment(id) {
    return apiClient.get(`${BASE_URL}/${id}`);
  },

  /*
  ------------------------------------
  Update
  ------------------------------------
  */

  updateAppointment(id, data) {
    return apiClient.put(`${BASE_URL}/${id}`, data);
  },

  /*
  ------------------------------------
  Delete
  ------------------------------------
  */

  deleteAppointment(id) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  },

  /*
  ------------------------------------
  Status
  ------------------------------------
  */

  updateStatus(id, status) {
    return apiClient.patch(`${BASE_URL}/status/${id}`, {
      status,
    });
  },

  /*
  ------------------------------------
  Reply
  ------------------------------------
  */

  reply(id, remarks) {
    return apiClient.post(`${BASE_URL}/reply/${id}`, {
      remarks,
    });
  },

  /*
  ------------------------------------
  Dashboard
  ------------------------------------
  */

  statistics() {
    return apiClient.get(`${BASE_URL}/statistics`);
  },

  today() {
    return apiClient.get(`${BASE_URL}/today`);
  },
};

export default appointmentApi;
