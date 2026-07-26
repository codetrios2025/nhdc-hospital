import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

import { changeVideoStatus } from "../../../redux/thunks/videoThunk";

const VideoStatusSwitch = ({ video }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    const result = await Swal.fire({
      title: "Change Status?",
      text: "Update video status?",
      icon: "question",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      await dispatch(changeVideoStatus(video._id, !video.isActive));

      Swal.fire({
        icon: "success",
        title: "Updated",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Unable to update status.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        checked={video.isActive}
        disabled={loading}
        onChange={toggleStatus}
      />
    </div>
  );
};

export default VideoStatusSwitch;
