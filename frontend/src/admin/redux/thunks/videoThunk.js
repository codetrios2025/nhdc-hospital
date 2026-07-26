import videoApi from "../../features/videos/api/videoApi";

import {
  requestStart,
  requestFailure,
  setVideos,
  setVideo,
  addVideo,
  updateVideo,
  removeVideo,
} from "../slices/videoSlice";

export const fetchVideos =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(requestStart());

      const response = await videoApi.getVideos(params);

      console.log("=========== RESPONSE ===========");
      console.log(response);
      console.log("===============================");

      const result = response.data || {};

      console.log("=========== RESULT ===========");
      console.log(result);
      console.log("===============================");

      dispatch(
        setVideos({
          videos: result.videos || [],
          pagination: {
            total: result.total || 0,
            page: result.page || 1,
            limit: result.limit || 10,
            totalPages: result.totalPages || 1,
          },
        }),
      );
    } catch (error) {
      console.error("FETCH VIDEO ERROR");
      console.error(error);

      dispatch(
        requestFailure(
          error.message ||
            error.response?.data?.message ||
            "Unable to fetch videos.",
        ),
      );
    }
  };

export const fetchVideo = (id) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await videoApi.getVideo(id);

    dispatch(setVideo(response.data));
  } catch (error) {
    dispatch(
      requestFailure(error.response?.data?.message || "Unable to fetch video."),
    );
  }
};

export const createVideo = (formData) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await videoApi.createVideo(formData);

    dispatch(addVideo(response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to create video.",
      ),
    );

    throw error;
  }
};

export const updateVideoData = (id, formData) => async (dispatch) => {
  try {
    dispatch(requestStart());

    const response = await videoApi.updateVideo(id, formData);

    dispatch(updateVideo(response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to update video.",
      ),
    );

    throw error;
  }
};

export const deleteVideo = (id) => async (dispatch) => {
  try {
    dispatch(requestStart());

    await videoApi.deleteVideo(id);

    dispatch(removeVideo(id));
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to delete video.",
      ),
    );

    throw error;
  }
};

export const changeVideoStatus = (id, isActive) => async (dispatch) => {
  try {
    const response = await videoApi.changeStatus(id, isActive);

    dispatch(updateVideo(response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to update status.",
      ),
    );

    throw error;
  }
};

export const toggleVideoFeatured = (id, featured) => async (dispatch) => {
  try {
    const response = await videoApi.toggleFeatured(id, featured);

    dispatch(updateVideo(response.data));

    return response;
  } catch (error) {
    dispatch(
      requestFailure(
        error.response?.data?.message || "Unable to update featured.",
      ),
    );

    throw error;
  }
};
