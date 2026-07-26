import { useEffect, useState } from "react";

const ServiceImage = ({ service, setValue }) => {
  const [preview, setPreview] = useState("/default-service.webp");

  useEffect(() => {
    if (service?.imageUrl) {
      setPreview(service.imageUrl);
    }
  }, [service]);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setValue("image", file, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">Service Image</h5>
      </div>

      <div className="card-body text-center">
        <img
          src={preview}
          alt=""
          className="img-thumbnail mb-3"
          style={{
            width: "220px",
            height: "180px",
            objectFit: "cover",
          }}
        />

        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleImage}
        />
      </div>
    </div>
  );
};

export default ServiceImage;
