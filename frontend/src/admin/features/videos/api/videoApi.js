import apiClient from "../../../api/client/apiClient";

const videoApi = {
  getVideos(params = {}) {
    return apiClient.get("/videos", params);
  },

  getVideo(id) {
    return apiClient.get(`/videos/${id}`);
  },

  createVideo(data) {
    return apiClient.post("/videos", data);
  },

  updateVideo(id, data) {
    return apiClient.put(`/videos/${id}`, data);
  },

  deleteVideo(id) {
    return apiClient.delete(`/videos/${id}`);
  },

  changeStatus(id, isActive) {
    return apiClient.patch(`/videos/${id}/status`, {
      isActive,
    });
  },

  toggleFeatured(id, featured) {
    return apiClient.patch(`/videos/${id}/featured`, {
      featured,
    });
  },
};

export default videoApi;
