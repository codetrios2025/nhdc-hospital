import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,

  videos: [],

  video: null,

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },

  error: null,
};

const videoSlice = createSlice({
  name: "video",

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

    setVideos(state, action) {
      state.loading = false;

      state.videos = Array.isArray(action.payload?.videos)
        ? action.payload.videos
        : [];

      state.pagination = action.payload?.pagination || {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
      };

      state.error = null;
    },
    // setVideos(state, action) {
    //   state.loading = false;

    //   state.videos = action.payload.videos;

    //   state.pagination = action.payload.pagination;
    // },

    setVideo(state, action) {
      state.loading = false;

      state.video = action.payload;
    },

    addVideo(state, action) {
      state.loading = false;

      state.videos.unshift(action.payload);
    },

    updateVideo(state, action) {
      const index = state.videos.findIndex(
        (item) => item._id === action.payload._id,
      );

      if (index !== -1) {
        state.videos[index] = action.payload;
      }

      state.video = action.payload;
    },

    removeVideo(state, action) {
      state.loading = false;

      state.videos = state.videos.filter((item) => item._id !== action.payload);
    },
  },
});

export const {
  requestStart,
  requestFailure,
  setVideos,
  setVideo,
  addVideo,
  updateVideo,
  removeVideo,
} = videoSlice.actions;

export default videoSlice.reducer;
