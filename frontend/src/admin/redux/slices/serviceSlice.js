import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,

  services: [],

  service: null,

  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },

  error: null,
};

const serviceSlice = createSlice({
  name: "service",

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

    setServices(state, action) {
      state.loading = false;

      state.services = action.payload.services;

      state.pagination = action.payload.pagination;
    },

    setService(state, action) {
      state.loading = false;

      state.service = action.payload;
    },

    addService(state, action) {
      state.loading = false;

      state.services.unshift(action.payload);
    },

    updateService(state, action) {
      state.loading = false;

      state.services = state.services.map((service) =>
        service._id === action.payload._id ? action.payload : service,
      );

      if (state.service && state.service._id === action.payload._id) {
        state.service = action.payload;
      }
    },

    removeService(state, action) {
      state.loading = false;

      state.services = state.services.filter(
        (service) => service._id !== action.payload,
      );
    },

    clearService(state) {
      state.service = null;
    },
  },
});

export const {
  requestStart,
  requestFailure,
  setServices,
  setService,
  addService,
  updateService,
  removeService,
  clearService,
} = serviceSlice.actions;

export default serviceSlice.reducer;
