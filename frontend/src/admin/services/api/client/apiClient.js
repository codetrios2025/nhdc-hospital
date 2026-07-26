import axiosClient from "./axiosClient";

import queryParams from "../../../utils/queryParams";

const apiClient = {
  get: async (url, params = {}) => {
    const query = queryParams(params);

    const response = await axiosClient.get(query ? `${url}?${query}` : url);

    return response.data;
  },

  post: async (url, data) => {
    const response = await axiosClient.post(
      url,

      data,
    );

    return response.data;
  },

  put: async (url, data) => {
    const response = await axiosClient.put(
      url,

      data,
    );

    return response.data;
  },

  patch: async (url, data) => {
    const response = await axiosClient.patch(
      url,

      data,
    );

    return response.data;
  },

  delete: async (url) => {
    const response = await axiosClient.delete(url);

    return response.data;
  },
};

export default apiClient;
