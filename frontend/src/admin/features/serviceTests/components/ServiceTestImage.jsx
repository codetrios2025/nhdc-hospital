import { useEffect, useRef, useState } from "react";

const ServiceTestImage = ({ register, setValue, watch }) => {
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const image = watch("image");

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setValue("image", file, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setPreview(URL.createObjectURL(file));
  };

  /*
  |--------------------------------------------------------------------------
  | Reset Preview when form resets
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!image) {
      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [image]);

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Image</h5>
      </div>

      <div className="card-body">
        <input
          ref={fileInputRef}
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Image Alt"
          {...register("imageAlt")}
        />

        {(preview || image?.imageUrl) && (
          <img
            src={preview || image?.imageUrl}
            alt={watch("imageAlt") || ""}
            className="img-thumbnail"
            style={{
              maxHeight: "200px",
              objectFit: "cover",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ServiceTestImage;
