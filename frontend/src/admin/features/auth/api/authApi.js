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
};

export default authApi;
