import serviceApi from "../../features/services/api/serviceApi";

import {
  requestStart,
  requestFailure,
  setServices,
  setService,
  addService,
  updateService as updateServiceState,
  removeService,
} from "../slices/serviceSlice";

/*
|--------------------------------------------------------------------------
| Get All Services
|--------------------------------------------------------------------------
*/

export const fetchServices =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(requestStart());

      const response = await serviceApi.getServices(params);

      dispatch(
        setServices({
          services:
            response.data || response.data.services || response.data.rows || [],

          pagination: {
            total: response.data.total || 0,
            page: response.data.page || 1,
            limit: response.data.limit || 10,
            totalPages: response.data.totalPages || 1,
          },
        }),
      );

      return response;
    } catch (error) {
      dispatch(
        requestFailure(
          error.response?.data?.message ||
            error.message ||
            "Unable to fetch services.",
        ),
      );

      throw error;
    }
  };

/*
|--------------------------------------------------------------------------
| Get Service
|--------------------------------------------------------------------------
*/

export const fetchService = (id) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await serviceApi.getService(id);

    dispatch(setService(response.data.data || response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to fetch service.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Create Service
|--------------------------------------------------------------------------
*/

export const createService = (formData) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await serviceApi.createService(formData);

    dispatch(addService(response.data.data || response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to create service.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Update Service
|--------------------------------------------------------------------------
*/

export const updateService = (id, formData) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await serviceApi.updateService(id, formData);

    dispatch(updateServiceState(response.data.data || response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to update service.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Delete Service
|--------------------------------------------------------------------------
*/

export const deleteService = (id) => async (dispatch) => {
  try {
    dispatch(requestStart());

    await serviceApi.deleteService(id);

    dispatch(removeService(id));
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to delete service.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Delete Gallery Image
|--------------------------------------------------------------------------
*/

export const deleteServiceGalleryImage =
  (serviceId, imageId) => async (dispatch) => {
    try {
      dispatch(requestStart());

      const response = await serviceApi.deleteGalleryImage(serviceId, imageId);

      dispatch(updateServiceState(response.data.data));

      return response;
    } catch (error) {
      dispatch(
        requestFailure(
          error.response?.data?.message || "Unable to delete gallery image.",
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

export const changeServiceStatus = (id, status) => async (dispatch) => {
  try {
    const response = await serviceApi.changeStatus(id, status);

    dispatch(updateServiceState(response.data.data || response.data));

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
| Toggle Featured
|--------------------------------------------------------------------------
*/

export const toggleServiceFeatured = (id, isFeatured) => async (dispatch) => {
  try {
    const response = await serviceApi.toggleFeatured(id, isFeatured);

    dispatch(updateServiceState(response.data.data || response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to update featured.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Home
|--------------------------------------------------------------------------
*/

export const toggleServiceHome = (id, showOnHome) => async (dispatch) => {
  try {
    const response = await serviceApi.toggleHome(id, showOnHome);

    dispatch(updateServiceState(response.data.data || response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to update Home status.",
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

export const updateServiceOrder = (id, displayOrder) => async (dispatch) => {
  try {
    const response = await serviceApi.updateDisplayOrder(id, displayOrder);

    dispatch(updateServiceState(response.data.data || response.data));

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
