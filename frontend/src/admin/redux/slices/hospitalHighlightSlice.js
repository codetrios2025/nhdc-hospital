import { createSlice } from "@reduxjs/toolkit";

import {
  fetchHospitalHighlights,
  fetchHospitalHighlightById,
  createHospitalHighlight,
  updateHospitalHighlight,
  deleteHospitalHighlight,
  changeHospitalHighlightStatus,
} from "../thunks/hospitalHighlightThunk";

const initialState = {
  hospitalHighlights: [],
  hospitalHighlight: null,
  loading: false,
  error: null,
};

const hospitalHighlightSlice = createSlice({
  name: "hospitalHighlights",

  initialState,

  reducers: {
    clearHospitalHighlight(state) {
      state.hospitalHighlight = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch All
      .addCase(fetchHospitalHighlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchHospitalHighlights.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitalHighlights = action.payload;
      })

      .addCase(fetchHospitalHighlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch By ID
      .addCase(fetchHospitalHighlightById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchHospitalHighlightById.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitalHighlight = action.payload;
      })

      .addCase(fetchHospitalHighlightById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createHospitalHighlight.pending, (state) => {
        state.loading = true;
      })

      .addCase(createHospitalHighlight.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(createHospitalHighlight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateHospitalHighlight.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateHospitalHighlight.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateHospitalHighlight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteHospitalHighlight.fulfilled, (state, action) => {
        state.hospitalHighlights = state.hospitalHighlights.filter(
          (item) => item._id !== action.payload,
        );
      })

      // Status
      .addCase(changeHospitalHighlightStatus.fulfilled, (state, action) => {
        const index = state.hospitalHighlights.findIndex(
          (item) => item._id === action.payload._id,
        );

        if (index !== -1) {
          state.hospitalHighlights[index] = action.payload;
        }
      });
  },
});

export const { clearHospitalHighlight } = hospitalHighlightSlice.actions;

export default hospitalHighlightSlice.reducer;
