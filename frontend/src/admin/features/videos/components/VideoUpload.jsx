import { useEffect, useState } from "react";

const VideoUpload = ({ watch, setValue }) => {
  const sourceType = watch("sourceType");

  const file = watch("videoFile");

  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (!file) return;

    if (file instanceof File) {
      const url = URL.createObjectURL(file);

      setVideoUrl(url);

      return () => URL.revokeObjectURL(url);
    }

    if (typeof file === "string") {
      setVideoUrl(file);
    }
  }, [file]);

  if (sourceType !== "upload") {
    return null;
  }

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Video Upload</h5>
      </div>

      <div className="card-body">
        <input
          type="file"
          className="form-control mb-3"
          accept="video/*"
          onChange={(e) => setValue("videoFile", e.target.files[0])}
        />

        {videoUrl && (
          <video
            controls
            width="100%"
            style={{
              borderRadius: 10,
            }}
          >
            <source src={videoUrl} />
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
