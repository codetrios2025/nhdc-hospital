import apiClient from "../../../api/client/apiClient";

const authApi = {
  login(data) {
    return apiClient.post("/auth/login", data);
  },

  profile() {
    return apiClient.get("/auth/profile");
  },

  logout() {
    return apiClient.post("/auth/logout");
  },
  resetPassword: async (token, password) => {
    const response = await apiClient.post(`/auth/reset-password/${token}`, {
      password,
    });

    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await apiClient.post("/auth/forgot-password", {
      email,
    });

    return response.data;
  },
};

export default authApi;
