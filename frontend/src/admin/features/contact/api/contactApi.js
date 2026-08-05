import apiClient from "../../../api/client/apiClient";

const BASE_URL = "/contact";

const contactApi = {
  getContact() {
    return apiClient.get(BASE_URL);
  },

  saveContact(data) {
    return apiClient.post(BASE_URL, data);
  },
};

export default contactApi;
