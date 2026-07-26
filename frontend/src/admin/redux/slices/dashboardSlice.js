import { createSlice } from "@reduxjs/toolkit";

import { fetchDashboardSummary } from "../thunks/dashboardThunk";

const initialState = {
  loading: false,

  summary: {
    doctors: 0,

    services: 0,

    appointments: 0,

    contacts: 0,

    gallery: 0,

    videos: 0,
  },

  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    clearDashboardError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchDashboardSummary.pending,

        (state) => {
          state.loading = true;

          state.error = null;
        },
      )

      .addCase(
        fetchDashboardSummary.fulfilled,

        (state, action) => {
          state.loading = false;

          state.summary = action.payload;
        },
      )

      .addCase(
        fetchDashboardSummary.rejected,

        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        },
      );
  },
});

export const { clearDashboardError } = dashboardSlice.actions;

export default dashboardSlice.reducer;
