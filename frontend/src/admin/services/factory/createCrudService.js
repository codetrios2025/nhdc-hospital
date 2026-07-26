import apiClient from "../../api/client/apiClient";

const createCrudService = (endpoint) => ({
  list(params = {}) {
    return apiClient.get(
      endpoint,

      params,
    );
  },

  getById(id) {
    return apiClient.get(`${endpoint}/${id}`);
  },

  create(data) {
    return apiClient.post(
      endpoint,

      data,
    );
  },

  update(id, data) {
    return apiClient.put(
      `${endpoint}/${id}`,

      data,
    );
  },

  patch(id, data) {
    return apiClient.patch(
      `${endpoint}/${id}`,

      data,
    );
  },

  remove(id) {
    return apiClient.delete(`${endpoint}/${id}`);
  },

  bulkDelete(ids = []) {
    return apiClient.post(
      `${endpoint}/bulk-delete`,

      {
        ids,
      },
    );
  },

  bulkUpdateStatus(ids, status) {
    return apiClient.patch(
      `${endpoint}/bulk-status`,

      {
        ids,

        status,
      },
    );
  },

  changeStatus(id, status) {
    return apiClient.patch(
      `${endpoint}/${id}/status`,

      {
        status,
      },
    );
  },

  restore(id) {
    return apiClient.patch(`${endpoint}/${id}/restore`);
  },
});

export default createCrudService;
