import Swal from "sweetalert2";

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
| Fetch Appointment List
|--------------------------------------------------------------------------
*/

export const fetchAppointments =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      //const { data } = await appointmentApi.getAppointments(params);
      const response = await appointmentApi.getAppointments(params);

      console.log("API Response", response);

      console.log("Response.data", response.data);

      dispatch(setAppointments(response.data));
      //dispatch(setAppointments(data));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || "Unable to fetch appointments.",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

/*
|--------------------------------------------------------------------------
| Fetch Appointment Details
|--------------------------------------------------------------------------
*/

export const fetchAppointment = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const { data } = await appointmentApi.getAppointment(id);

    dispatch(setAppointment(data.data));
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message || "Unable to fetch appointment details.",
      ),
    );
  } finally {
    dispatch(setLoading(false));
  }
};

/*
|--------------------------------------------------------------------------
| Fetch Dashboard Statistics
|--------------------------------------------------------------------------
*/

export const fetchStatistics = () => async (dispatch) => {
  try {
    const { data } = await appointmentApi.statistics();

    dispatch(setStatistics(data.data));
  } catch (error) {
    console.error(error);
  }
};

/*
|--------------------------------------------------------------------------
| Fetch Today's Appointments
|--------------------------------------------------------------------------
*/

export const fetchTodayAppointments = () => async (dispatch) => {
  try {
    const { data } = await appointmentApi.today();

    dispatch(setTodayAppointments(data.data));
  } catch (error) {
    console.error(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Appointment Status
|--------------------------------------------------------------------------
*/

export const updateAppointmentStatus =
  (id, status) => async (dispatch, getState) => {
    try {
      const result = await Swal.fire({
        title: "Update Appointment?",
        text: `Change appointment status to "${status}"?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Update",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      dispatch(setLoading(true));

      await appointmentApi.updateStatus(id, status);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Appointment status updated successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      const { pagination, filters } = getState().appointments;

      dispatch(
        fetchAppointments({
          page: pagination.page,
          limit: pagination.limit,
          ...filters,
        }),
      );

      dispatch(fetchStatistics());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Unable to update appointment status.",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

/*
|--------------------------------------------------------------------------
| Delete Appointment
|--------------------------------------------------------------------------
*/

export const deleteAppointment = (id) => async (dispatch, getState) => {
  try {
    const result = await Swal.fire({
      title: "Delete Appointment?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    dispatch(setLoading(true));

    await appointmentApi.deleteAppointment(id);

    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Appointment deleted successfully.",
      timer: 1800,
      showConfirmButton: false,
    });

    const { pagination, filters } = getState().appointments;

    dispatch(
      fetchAppointments({
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      }),
    );

    dispatch(fetchStatistics());
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Unable to delete appointment.",
    });
  } finally {
    dispatch(setLoading(false));
  }
};

/*
|--------------------------------------------------------------------------
| Save Admin Remarks
|--------------------------------------------------------------------------
*/

export const saveAppointmentRemarks =
  (id, remarks) => async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));

      await appointmentApi.reply(id, remarks);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Remarks saved successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      const { pagination, filters } = getState().appointments;

      dispatch(
        fetchAppointments({
          page: pagination.page,
          limit: pagination.limit,
          ...filters,
        }),
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Unable to save remarks.",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
