import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
  appointment: null,

  statistics: null,
  todayAppointments: [],

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  filters: {
    search: "",
    status: "",
    department: "",
    doctor: "",
    appointmentDate: "",
    fromDate: "",
    toDate: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  },

  loading: false,
  submitting: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointments",

  initialState,

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setSubmitting(state, action) {
      state.submitting = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    clearError(state) {
      state.error = null;
    },

    setAppointmentsold(state, action) {
      const payload = action.payload;

      state.appointments = payload.data || [];

      state.pagination = {
        page: payload.page || 1,
        limit: payload.limit || 10,
        total: payload.total || 0,
        totalPages: payload.totalPages || 0,
      };
    },

    setAppointments(state, action) {
      const payload = action.payload;

      console.log("Reducer Payload:", payload);

      // If API returns an array directly
      if (Array.isArray(payload)) {
        state.appointments = payload;

        state.pagination = {
          page: 1,
          limit: payload.length,
          total: payload.length,
          totalPages: 1,
        };

        return;
      }

      // If API returns { data: [] }
      if (Array.isArray(payload.data)) {
        state.appointments = payload.data;

        state.pagination = {
          page: payload.page || 1,
          limit: payload.limit || 10,
          total: payload.total || payload.data.length,
          totalPages: payload.totalPages || 1,
        };

        return;
      }

      // If API returns { data: { data: [] } }
      state.appointments = payload.data?.data || [];

      state.pagination = {
        page: payload.data?.page || 1,
        limit: payload.data?.limit || 10,
        total: payload.data?.total || 0,
        totalPages: payload.data?.totalPages || 0,
      };
    },

    setAppointment(state, action) {
      state.appointment = action.payload;
    },

    setStatistics(state, action) {
      state.statistics = action.payload;
    },

    setTodayAppointments(state, action) {
      state.todayAppointments = action.payload;
    },

    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setLoading,
  setSubmitting,
  setError,
  clearError,
  setAppointments,
  setAppointment,
  setStatistics,
  setTodayAppointments,
  setFilters,
  resetFilters,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
