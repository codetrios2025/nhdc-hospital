import API from "../api/client/apiClient";

import API_ENDPOINTS from "../../constants/apiEndpoints";

const authService = {
  login: (data) => {
    return API.post(
      API_ENDPOINTS.AUTH.LOGIN,

      data,
    );
  },

  profile: () => {
    return API.get(API_ENDPOINTS.AUTH.PROFILE);
  },

  logout: () => {
    return API.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};

export default authService;
