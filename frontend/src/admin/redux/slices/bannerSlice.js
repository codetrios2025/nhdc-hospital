import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,

  banners: [],

  banner: null,

  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  },

  error: null,
};

const bannerSlice = createSlice({
  name: "banner",

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

    setBanners(state, action) {
      state.loading = false;

      state.banners = action.payload.banners;

      state.pagination = action.payload.pagination;
    },

    setBanner(state, action) {
      state.loading = false;

      state.banner = action.payload;
    },

    addBanner(state, action) {
      state.loading = false;

      state.banners.unshift(action.payload);
    },

    updateBanner(state, action) {
      state.loading = false;

      state.banners = state.banners.map((banner) =>
        banner._id === action.payload._id ? action.payload : banner,
      );

      if (state.banner && state.banner._id === action.payload._id) {
        state.banner = action.payload;
      }
    },

    removeBanner(state, action) {
      state.loading = false;

      state.banners = state.banners.filter(
        (banner) => banner._id !== action.payload,
      );
    },

    clearBanner(state) {
      state.banner = null;
    },
  },
});

export const {
  requestStart,
  requestFailure,
  setBanners,
  setBanner,
  addBanner,
  updateBanner,
  removeBanner,
  clearBanner,
} = bannerSlice.actions;

export default bannerSlice.reducer;
