import doctorApi from "../../features/doctors/api/doctorApi";

import {
  requestStart,
  requestFailure,
  setDoctors,
  setDoctor,
  addDoctor,
  updateDoctor,
  removeDoctor,
} from "../slices/doctorSlice";

export const fetchDoctors =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(requestStart());

      const response = await doctorApi.getDoctors(params);

      console.log("Doctor Response:", response);

      console.log("Doctor Response Data:", response.data);

      dispatch(
        setDoctors({
          doctors: response.data.doctors,
          pagination: {
            total: response.data.total,
            page: response.data.page,
            limit: response.data.limit,
            totalPages: response.data.totalPages,
          },
        }),
      );
    } catch (error) {
      console.error(error);

      dispatch(
        requestFailure(
          error.response?.data?.message ||
            error.message ||
            "Unable to fetch doctors.",
        ),
      );
    }
  };

export const fetchDoctor = (id) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await doctorApi.getDoctor(id);

    dispatch(setDoctor(response.data));
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to fetch doctor.",
      ),
    );
  }
};

export const createDoctor = (formData) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await doctorApi.createDoctor(formData);

    dispatch(addDoctor(response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to create doctor.",
      ),
    );

    throw error;
  }
};

export const updateDoctorData = (id, formData) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await doctorApi.updateDoctor(id, formData);

    dispatch(updateDoctor(response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to update doctor.",
      ),
    );

    throw error;
  }
};

export const deleteDoctor = (id) => async (dispatch) => {
  try {
    dispatch(requestStart());

    await doctorApi.deleteDoctor(id);

    dispatch(removeDoctor(id));
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to delete doctor.",
      ),
    );
  }
};

export const changeDoctorStatus = (id, isActive) => async (dispatch) => {
  try {
    const response = await doctorApi.changeStatus(id, isActive);

    dispatch(updateDoctor(response.data));

    return response;
  } catch (error) {
    dispatch(requestFailure(error.response?.data?.message));

    throw error;
  }
};

export const toggleDoctorFeatured = (id, featured) => async (dispatch) => {
  try {
    const response = await doctorApi.toggleFeatured(id, featured);

    dispatch(updateDoctor(response.data));
  } catch (error) {
    dispatch(requestFailure(error.response?.data?.message));
  }
};
