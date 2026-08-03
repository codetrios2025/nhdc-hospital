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
    /*
    |--------------------------------------------------------------------------
    | Request Start
    |--------------------------------------------------------------------------
    */

    requestStart(state) {
      state.loading = true;
      state.error = null;
    },

    /*
    |--------------------------------------------------------------------------
    | Request Failure
    |--------------------------------------------------------------------------
    */

    requestFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    /*
    |--------------------------------------------------------------------------
    | Banner Listing
    |--------------------------------------------------------------------------
    */

    setBanners(state, action) {
      state.loading = false;

      state.banners = action.payload.banners || [];

      state.pagination = {
        ...state.pagination,
        ...action.payload.pagination,
      };
    },

    /*
    |--------------------------------------------------------------------------
    | Banner Details
    |--------------------------------------------------------------------------
    */

    setBanner(state, action) {
      state.loading = false;

      state.banner = action.payload;
    },

    /*
    |--------------------------------------------------------------------------
    | Create Banner
    |--------------------------------------------------------------------------
    */

    addBanner(state, action) {
      state.loading = false;

      state.banners.unshift(action.payload);

      state.pagination.total += 1;
    },

    /*
    |--------------------------------------------------------------------------
    | Update Banner
    |--------------------------------------------------------------------------
    */

    updateBanner(state, action) {
      state.loading = false;

      state.banners = state.banners.map((banner) =>
        banner._id === action.payload._id ? action.payload : banner,
      );

      if (state.banner && state.banner._id === action.payload._id) {
        state.banner = action.payload;
      }
    },

    /*
    |--------------------------------------------------------------------------
    | Delete Banner
    |--------------------------------------------------------------------------
    */

    removeBanner(state, action) {
      state.loading = false;

      state.banners = state.banners.filter(
        (banner) => banner._id !== action.payload,
      );

      if (state.pagination.total > 0) {
        state.pagination.total -= 1;
      }

      if (state.banner && state.banner._id === action.payload) {
        state.banner = null;
      }
    },

    /*
    |--------------------------------------------------------------------------
    | Clear Banner
    |--------------------------------------------------------------------------
    */

    clearBanner(state) {
      state.banner = null;
    },

    /*
    |--------------------------------------------------------------------------
    | Clear Error
    |--------------------------------------------------------------------------
    */

    clearError(state) {
      state.error = null;
    },

    /*
    |--------------------------------------------------------------------------
    | Reset Banner State
    |--------------------------------------------------------------------------
    */

    resetBannerState(state) {
      state.loading = false;

      state.banners = [];

      state.banner = null;

      state.pagination = {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      };

      state.error = null;
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
  clearError,
  resetBannerState,
} = bannerSlice.actions;

export default bannerSlice.reducer;
