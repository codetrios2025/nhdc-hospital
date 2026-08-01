import diagnosticApi from "../../features/diagnostic/api/diagnosticApi";

import {
  requestStart,
  requestFailure,
  setDiagnostics,
  setDiagnostic,
  addDiagnostic,
  updateDiagnostic,
  removeDiagnostic,
} from "../slices/diagnosticSlice";

/*
|--------------------------------------------------------------------------
| Get All Diagnostics
|--------------------------------------------------------------------------
*/

export const fetchDiagnostics =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(requestStart());

      const response = await diagnosticApi.getDiagnostics(params);

      dispatch(
        setDiagnostics({
          diagnostics: response.data || [],

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
            "Unable to fetch Diagnostic Services.",
        ),
      );

      throw error;
    }
  };

/*
|--------------------------------------------------------------------------
| Get Diagnostic
|--------------------------------------------------------------------------
*/

export const fetchDiagnostic = (id) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await diagnosticApi.getDiagnostic(id);

    dispatch(setDiagnostic(response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to fetch Diagnostic Service.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Create Diagnostic
|--------------------------------------------------------------------------
*/

export const createDiagnostic = (payload) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await diagnosticApi.createDiagnostic(payload);

    dispatch(addDiagnostic(response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to create Diagnostic Service.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Update Diagnostic
|--------------------------------------------------------------------------
*/

export const updateDiagnosticData = (id, payload) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await diagnosticApi.updateDiagnostic(id, payload);

    dispatch(updateDiagnostic(response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to update Diagnostic Service.",
      ),
    );

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Delete Diagnostic
|--------------------------------------------------------------------------
*/

export const deleteDiagnostic = (id) => async (dispatch) => {
  try {
    dispatch(requestStart());

    await diagnosticApi.deleteDiagnostic(id);

    dispatch(removeDiagnostic(id));
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to delete Diagnostic Service.",
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

export const changeDiagnosticStatus = (id, status) => async (dispatch) => {
  try {
    const response = await diagnosticApi.updateStatus(id, status);

    dispatch(updateDiagnostic(response.data));

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

export const updateDiagnosticOrder = (id, displayOrder) => async (dispatch) => {
  try {
    const response = await diagnosticApi.updateDisplayOrder(id, displayOrder);

    dispatch(updateDiagnostic(response.data));

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
