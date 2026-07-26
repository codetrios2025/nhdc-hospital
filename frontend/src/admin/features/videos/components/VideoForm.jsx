import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";

import useVideoForm from "../hooks/useVideoForm";

import VideoBasicInfo from "./VideoBasicInfo";
import VideoSourceInfo from "./VideoSourceInfo";
import VideoThumbnail from "./VideoThumbnail";
import VideoUpload from "./VideoUpload";

import createVideoFormData from "../utils/createVideoFormData";
import updateVideoFormData from "../utils/updateVideoFormData";

import { createVideo, updateVideoData } from "../../../redux/thunks/videoThunk";

const VideoForm = ({ videoId = null }) => {
  const methods = useVideoForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, video } = useSelector((state) => state.video);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (!videoId || !video) return;

    Object.keys(video).forEach((key) => {
      if (key === "thumbnail") return;

      if (key === "videoFile") return;

      setValue(key, video[key]);
    });

    if (video.thumbnailUrl) {
      setValue("thumbnail", video.thumbnailUrl);
    }

    if (video.videoUrl) {
      setValue("videoFile", video.videoUrl);
    }
  }, [video, videoId, setValue]);

  const onSubmit = async (data) => {
    try {
      let response;

      if (videoId) {
        const formData = updateVideoFormData(data);

        response = await dispatch(updateVideoData(videoId, formData));

        Swal.fire({
          icon: "success",

          title: "Updated",

          text: "Video updated successfully",
        });
      } else {
        const formData = createVideoFormData(data);

        response = await dispatch(createVideo(formData));

        Swal.fire({
          icon: "success",

          title: "Success",

          text: "Video created successfully",
        });
      }

      console.log(response);

      navigate("/videos");
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "Error",

        text:
          error.response?.data?.message ||
          error.message ||
          "Unable to save video",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-8">
          <VideoBasicInfo register={register} errors={errors} />

          <VideoSourceInfo register={register} watch={watch} errors={errors} />

          <VideoUpload watch={watch} setValue={setValue} />
        </div>

        <div className="col-lg-4">
          <VideoThumbnail watch={watch} setValue={setValue} />
        </div>
      </div>

      <div className="text-end">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : videoId ? "Update Video" : "Save Video"}
        </button>
      </div>
    </form>
  );
};

export default VideoForm;
