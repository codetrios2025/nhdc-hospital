import { useState } from "react";

const DoctorGalleryUpload = ({ setValue }) => {
  const [preview, setPreview] = useState([]);

  const handleGallery = (e) => {
    const files = Array.from(e.target.files);

    setValue("gallery", files);

    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>Gallery</h5>
      </div>

      <div className="card-body">
        <input
          type="file"
          multiple
          className="form-control"
          accept="image/*"
          onChange={handleGallery}
        />

        <div className="row mt-3">
          {preview.map((image, index) => (
            <div className="col-4 mb-2" key={index}>
              <img src={image} className="img-fluid rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorGalleryUpload;
