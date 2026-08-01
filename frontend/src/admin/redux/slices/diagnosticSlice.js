import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,

  diagnostics: [],

  diagnostic: null,

  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },

  error: null,
};

const diagnosticSlice = createSlice({
  name: "diagnostic",

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

    setDiagnostics(state, action) {
      state.loading = false;

      state.diagnostics = action.payload.diagnostics;

      state.pagination = action.payload.pagination;
    },

    setDiagnostic(state, action) {
      state.loading = false;

      state.diagnostic = action.payload;
    },

    addDiagnostic(state, action) {
      state.loading = false;

      state.diagnostics.unshift(action.payload);
    },

    updateDiagnostic(state, action) {
      state.loading = false;

      state.diagnostics = state.diagnostics.map((item) =>
        item._id === action.payload._id ? action.payload : item,
      );

      if (state.diagnostic && state.diagnostic._id === action.payload._id) {
        state.diagnostic = action.payload;
      }
    },

    removeDiagnostic(state, action) {
      state.loading = false;

      state.diagnostics = state.diagnostics.filter(
        (item) => item._id !== action.payload,
      );
    },

    clearDiagnostic(state) {
      state.diagnostic = null;
    },
  },
});

export const {
  requestStart,
  requestFailure,
  setDiagnostics,
  setDiagnostic,
  addDiagnostic,
  updateDiagnostic,
  removeDiagnostic,
  clearDiagnostic,
} = diagnosticSlice.actions;

export default diagnosticSlice.reducer;
