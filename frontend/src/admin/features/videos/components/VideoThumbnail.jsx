import { useEffect, useState } from "react";

const VideoThumbnail = ({ watch, setValue }) => {
  const [preview, setPreview] = useState("");

  const thumbnail = watch("thumbnail");

  useEffect(() => {
    if (!thumbnail) return;

    if (thumbnail instanceof File) {
      const objectUrl = URL.createObjectURL(thumbnail);

      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    if (typeof thumbnail === "string") {
      setPreview(thumbnail);
    }
  }, [thumbnail]);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setValue("thumbnail", file);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Thumbnail</h5>
      </div>

      <div className="card-body text-center">
        <img
          src={preview || "/default-video.png"}
          alt="Thumbnail"
          className="img-fluid rounded mb-3"
          style={{
            maxHeight: "220px",
            objectFit: "cover",
          }}
        />

        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleImage}
        />
      </div>
    </div>
  );
};

export default VideoThumbnail;
