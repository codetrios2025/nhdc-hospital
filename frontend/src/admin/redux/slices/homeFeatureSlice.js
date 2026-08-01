import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,

  homeFeatures: [],

  homeFeature: null,

  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },

  error: null,
};

const homeFeatureSlice = createSlice({
  name: "homeFeature",

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

    setHomeFeatures(state, action) {
      state.loading = false;

      state.homeFeatures = action.payload.homeFeatures;

      state.pagination = action.payload.pagination;
    },

    setHomeFeature(state, action) {
      state.loading = false;

      state.homeFeature = action.payload;
    },

    addHomeFeature(state, action) {
      state.loading = false;

      state.homeFeatures.unshift(action.payload);
    },

    updateHomeFeature(state, action) {
      state.loading = false;

      state.homeFeatures = state.homeFeatures.map((item) =>
        item._id === action.payload._id ? action.payload : item,
      );

      if (state.homeFeature && state.homeFeature._id === action.payload._id) {
        state.homeFeature = action.payload;
      }
    },

    removeHomeFeature(state, action) {
      state.loading = false;

      state.homeFeatures = state.homeFeatures.filter(
        (item) => item._id !== action.payload,
      );
    },

    clearHomeFeature(state) {
      state.homeFeature = null;
    },
  },
});

export const {
  requestStart,
  requestFailure,
  setHomeFeatures,
  setHomeFeature,
  addHomeFeature,
  updateHomeFeature,
  removeHomeFeature,
  clearHomeFeature,
} = homeFeatureSlice.actions;

export default homeFeatureSlice.reducer;
