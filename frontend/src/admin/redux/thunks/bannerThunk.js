import bannerApi from "../../features/banner/api/bannerApi";

import {
  requestStart,
  requestFailure,
  setBanners,
  setBanner,
  addBanner,
  updateBanner as updateBannerState,
  removeBanner,
} from "../slices/bannerSlice";

/*
|--------------------------------------------------------------------------
| Fetch Banner List
|--------------------------------------------------------------------------
*/

export const fetchBanners =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(requestStart());

      const response = await bannerApi.getBanners(params);

      /*
      |--------------------------------------------------------------------------
      | apiClient already returns response.data
      |--------------------------------------------------------------------------
      */

      const result = response?.data || {};

      dispatch(
        setBanners({
          banners: Array.isArray(result.rows) ? result.rows : [],

          pagination: {
            total: result.total || 0,

            page: result.page || 1,

            limit: result.limit || 10,

            totalPages: result.totalPages || 1,
          },
        }),
      );

      return result;
    } catch (error) {
      dispatch(
        requestFailure(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to fetch banners.",
        ),
      );

      throw error;
    }
  };

/*
|--------------------------------------------------------------------------
| Fetch Banner Details
|--------------------------------------------------------------------------
*/

export const fetchBanner = (id) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await bannerApi.getBanner(id);

    dispatch(setBanner(response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to fetch banner.",
      ),
    );

    throw error;
  }
};
/*
|--------------------------------------------------------------------------
| Create Banner
|--------------------------------------------------------------------------
*/

export const createBanner = (formData) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await bannerApi.createBanner(formData);

    dispatch(addBanner(response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to create banner.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Update Banner
|--------------------------------------------------------------------------
*/

export const updateBanner = (id, formData) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await bannerApi.updateBanner(id, formData);

    dispatch(updateBannerState(response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to update banner.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Delete Banner
|--------------------------------------------------------------------------
*/

export const deleteBanner = (id) => async (dispatch) => {
  try {
    dispatch(requestStart());

    await bannerApi.deleteBanner(id);

    dispatch(removeBanner(id));

    return true;
  } catch (error) {
    dispatch(
      requestFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to delete banner.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Change Banner Status
|--------------------------------------------------------------------------
*/

export const changeBannerStatus = (id, status) => async (dispatch) => {
  try {
    const response = await bannerApi.changeStatus(id, status);

    dispatch(updateBannerState(response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to update banner status.",
      ),
    );

    throw error;
  }
};
