import axiosClient from "./axiosClient";
import queryBuilder from "../../utils/queryBuilder";

const apiClient = {
  async get(url, params = {}) {
    const query = queryBuilder(params);

    const response = await axiosClient.get(query ? `${url}?${query}` : url);

    return response.data;
  },

  async post(url, data = {}, config = {}) {
    const isFormData = data instanceof FormData;

    const response = await axiosClient.post(url, data, {
      ...config,
      headers: {
        ...(config.headers || {}),
        ...(isFormData
          ? {}
          : {
              "Content-Type": "application/json",
            }),
      },
    });

    return response.data;
  },

  async put(url, data = {}, config = {}) {
    const isFormData = data instanceof FormData;

    const response = await axiosClient.put(url, data, {
      ...config,
      headers: {
        ...(config.headers || {}),
        ...(isFormData
          ? {}
          : {
              "Content-Type": "application/json",
            }),
      },
    });

    return response.data;
  },

  async patch(url, data = {}) {
    const response = await axiosClient.patch(url, data);

    return response.data;
  },

  async delete(url) {
    const response = await axiosClient.delete(url);

    return response.data;
  },
};

export default apiClient;
