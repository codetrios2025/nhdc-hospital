import homeFeatureApi from "../../features/homeFeature/api/homeFeatureApi";

import {
  requestStart,
  requestFailure,
  setHomeFeatures,
  setHomeFeature,
  addHomeFeature,
  updateHomeFeature as updateHomeFeatureState,
  removeHomeFeature,
} from "../slices/homeFeatureSlice";

/*
|--------------------------------------------------------------------------
| Get All Home Features
|--------------------------------------------------------------------------
*/

export const fetchHomeFeatures =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(requestStart());

      const response = await homeFeatureApi.getHomeFeatures(params);

      console.log("Response:", response);

      dispatch(
        setHomeFeatures({
          homeFeatures: response.data || [],

          pagination: {
            total: response.total || 0,
            page: response.page || 1,
            limit: response.limit || 10,
            totalPages: response.totalPages || 1,
          },
        }),
      );

      return response;
    } catch (error) {
      dispatch(
        requestFailure(
          error.response?.data?.message ||
            error.message ||
            "Unable to fetch Home Features.",
        ),
      );

      throw error;
    }
  };

/*
|--------------------------------------------------------------------------
| Get Home Feature
|--------------------------------------------------------------------------
*/

export const fetchHomeFeature = (id) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await homeFeatureApi.getHomeFeature(id);

    dispatch(setHomeFeature(response.data.data || response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to fetch Home Feature.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Create Home Feature
|--------------------------------------------------------------------------
*/

export const createHomeFeature = (payload) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await homeFeatureApi.createHomeFeature(payload);

    dispatch(addHomeFeature(response.data.data || response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to create Home Feature.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Update Home Feature
|--------------------------------------------------------------------------
*/

export const updateHomeFeature = (id, payload) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await homeFeatureApi.updateHomeFeature(id, payload);

    dispatch(updateHomeFeatureState(response.data.data || response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to update Home Feature.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Delete Home Feature
|--------------------------------------------------------------------------
*/

export const deleteHomeFeature = (id) => async (dispatch) => {
  try {
    dispatch(requestStart());

    await homeFeatureApi.deleteHomeFeature(id);

    dispatch(removeHomeFeature(id));
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to delete Home Feature.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Change Status
|--------------------------------------------------------------------------
*/

export const changeHomeFeatureStatus = (id, status) => async (dispatch) => {
  try {
    const response = await homeFeatureApi.changeStatus(id, status);

    dispatch(updateHomeFeatureState(response.data.data || response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to update status.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Update Display Order
|--------------------------------------------------------------------------
*/

export const updateHomeFeatureOrder =
  (id, displayOrder) => async (dispatch) => {
    try {
      const response = await homeFeatureApi.updateDisplayOrder(
        id,
        displayOrder,
      );

      dispatch(updateHomeFeatureState(response.data.data || response.data));

      return response;
    } catch (error) {
      dispatch(
        requestFailure(
          error.response?.data?.message || "Unable to update display order.",
        ),
      );

      throw error;
    }
  };
