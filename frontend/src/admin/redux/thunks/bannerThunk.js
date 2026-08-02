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

      const result = await bannerApi.getBanners(params);

      dispatch(
        setBanners({
          banners: Array.isArray(result.data?.rows) ? result.data.rows : [],
          pagination: {
            total: result.data?.total || 0,
            page: result.data?.page || 1,
            limit: result.data?.limit || 10,
            totalPages: result.data?.totalPages || 1,
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

    const result = await bannerApi.getBanner(id);

    dispatch(setBanner(result.data));

    return result;
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

    const result = await bannerApi.createBanner(formData);

    dispatch(addBanner(result.data));

    return result;
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

    const result = await bannerApi.updateBanner(id, formData);

    dispatch(updateBannerState(result.data));

    return result;
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
| Update Banner Status
|--------------------------------------------------------------------------
*/

export const changeBannerStatus = (id, status) => async (dispatch) => {
  try {
    const result = await bannerApi.changeStatus(id, status);

    dispatch(updateBannerState(result.data));

    return result;
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
