import appointmentApi from "../../features/appointment/api/appointmentApi";

import {
  clearError,
  setAppointment,
  setAppointments,
  setError,
  setLoading,
  setStatistics,
  setTodayAppointments,
} from "../slices/appointmentSlice";

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

export const fetchAppointments =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response = await appointmentApi.getAppointments(params);
      console.log(response.data);
      dispatch(setAppointments(response.data));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

/*
|--------------------------------------------------------------------------
| Details
|--------------------------------------------------------------------------
*/

export const fetchAppointment = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await appointmentApi.getAppointment(id);

    dispatch(setAppointment(response.data.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

/*
|--------------------------------------------------------------------------
| Statistics
|--------------------------------------------------------------------------
*/

export const fetchStatistics = () => async (dispatch) => {
  try {
    const response = await appointmentApi.statistics();

    dispatch(setStatistics(response.data.data));
  } catch (error) {
    console.error(error);
  }
};

/*
|--------------------------------------------------------------------------
| Today's Appointments
|--------------------------------------------------------------------------
*/

export const fetchTodayAppointments = () => async (dispatch) => {
  try {
    const response = await appointmentApi.today();

    dispatch(setTodayAppointments(response.data.data));
  } catch (error) {
    console.error(error);
  }
};

export const updateAppointmentStatus =
  (id, status) => async (dispatch, getState) => {
    try {
      const result = await Swal.fire({
        title: "Update Appointment?",
        text: `Change status to "${status}"?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Update",
      });

      if (!result.isConfirmed) return;

      dispatch(setLoading(true));

      await appointmentApi.updateStatus(id, status);

      Swal.fire(
        "Updated",
        "Appointment status updated successfully.",
        "success",
      );

      const { pagination, filters } = getState().appointments;

      dispatch(
        fetchAppointments({
          page: pagination.page,
          limit: pagination.limit,
          ...filters,
        }),
      );
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Unable to update status",
        "error",
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteAppointment = (id) => async (dispatch, getState) => {
  try {
    const result = await Swal.fire({
      title: "Delete Appointment?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    dispatch(setLoading(true));

    await appointmentApi.deleteAppointment(id);

    Swal.fire("Deleted", "Appointment deleted successfully.", "success");

    const { pagination, filters } = getState().appointments;

    dispatch(
      fetchAppointments({
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      }),
    );
  } catch (error) {
    Swal.fire(
      "Error",
      error.response?.data?.message || "Unable to delete appointment",
      "error",
    );
  } finally {
    dispatch(setLoading(false));
  }
};
