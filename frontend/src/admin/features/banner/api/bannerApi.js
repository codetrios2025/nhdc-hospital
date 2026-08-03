import apiClient from "../../../api/client/apiClient";

const BASE_URL = "/banner";

const bannerApi = {
  /*
  |--------------------------------------------------------------------------
  | Get All Banners
  |--------------------------------------------------------------------------
  */

  getBanners(params = {}) {
    return apiClient.get(BASE_URL, params);
  },

  /*
  |--------------------------------------------------------------------------
  | Get Banner Details
  |--------------------------------------------------------------------------
  */

  getBanner(id) {
    return apiClient.get(`${BASE_URL}/${id}`);
  },

  /*
  |--------------------------------------------------------------------------
  | Create Banner
  |--------------------------------------------------------------------------
  */

  createBanner(formData) {
    return apiClient.post(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /*
  |--------------------------------------------------------------------------
  | Update Banner
  |--------------------------------------------------------------------------
  */

  updateBanner(id, formData) {
    return apiClient.put(`${BASE_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /*
  |--------------------------------------------------------------------------
  | Delete Banner
  |--------------------------------------------------------------------------
  */

  deleteBanner(id) {
    return apiClient.delete(`${BASE_URL}/${id}`);
  },

  /*
  |--------------------------------------------------------------------------
  | Change Status
  |--------------------------------------------------------------------------
  */

  changeStatus(id, status) {
    return apiClient.patch(`${BASE_URL}/status/${id}`, {
      status,
    });
  },
};

export default bannerApi;
