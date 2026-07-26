import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,

  doctors: [],

  doctor: null,

  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },

  error: null,
};

const doctorSlice = createSlice({
  name: "doctor",

  initialState,

  reducers: {
    requestStart(state) {
      state.loading = true;

      state.error = null;
    },

    requestFailure(state, action) {
      state.loading = false;

      state.error = action.payload;
    },

    setDoctors(state, action) {
      state.loading = false;

      state.doctors = action.payload.doctors;

      state.pagination = action.payload.pagination;
    },

    setDoctor(state, action) {
      state.loading = false;

      state.doctor = action.payload;
    },

    addDoctor(state, action) {
      state.loading = false;

      state.doctors.unshift(action.payload);
    },

    updateDoctor(state, action) {
      state.loading = false;

      state.doctors = state.doctors.map((doctor) =>
        doctor._id === action.payload._id ? action.payload : doctor,
      );

      if (state.doctor && state.doctor._id === action.payload._id) {
        state.doctor = action.payload;
      }
    },

    removeDoctor(state, action) {
      state.loading = false;

      state.doctors = state.doctors.filter(
        (doctor) => doctor._id !== action.payload,
      );
    },

    clearDoctor(state) {
      state.doctor = null;
    },
  },
});

export const {
  requestStart,
  requestFailure,
  setDoctors,
  setDoctor,
  addDoctor,
  updateDoctor,
  removeDoctor,
  clearDoctor,
} = doctorSlice.actions;

export default doctorSlice.reducer;
