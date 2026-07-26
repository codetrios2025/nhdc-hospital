import { useState } from "react";

import Swal from "sweetalert2";

import videoApi from "../api/videoApi";

const VideoFeaturedSwitch = ({ video, onUpdated }) => {
  const [loading, setLoading] = useState(false);

  const toggleFeatured = async () => {
    try {
      setLoading(true);

      await videoApi.toggleFeatured(video._id, !video.featured);

      Swal.fire({
        icon: "success",
        title: "Updated",
        timer: 1000,
        showConfirmButton: false,
      });

      onUpdated?.();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Unable to update featured.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-check form-switch">
      <input
        type="checkbox"
        className="form-check-input"
        checked={video.featured}
        disabled={loading}
        onChange={toggleFeatured}
      />
    </div>
  );
};

export default VideoFeaturedSwitch;
