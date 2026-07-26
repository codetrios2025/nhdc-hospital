import { useRef } from "react";

const ServiceGallery = ({
  gallery = [],
  setGallery,

  existingGallery = [],

  onDeleteExisting,

  editable = true,
}) => {
  const fileRef = useRef(null);

  const handleSelect = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    setGallery((prev) => [...prev, ...files]);

    e.target.value = "";
  };

  const removeImage = (index) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Gallery Images</h5>

        <span className="badge bg-primary">{gallery.length} Selected</span>
      </div>

      <div className="card-body">
        <button
          type="button"
          className="btn btn-primary mb-4"
          onClick={() => fileRef.current.click()}
        >
          <i className="bi bi-images me-2"></i>
          Choose Images
        </button>

        <input
          ref={fileRef}
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={handleSelect}
        />

        <div className="row">
          {gallery.map((file, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
              <div className="card">
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="card-img-top"
                  style={{
                    height: 180,
                    objectFit: "cover",
                  }}
                />

                <div className="card-body p-2">
                  <div className="small text-truncate mb-2" title={file.name}>
                    {file.name}
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm btn-danger w-100"
                    onClick={() => removeImage(index)}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!gallery.length && (
          <div className="text-center py-5 text-muted">
            <i
              className="bi bi-images"
              style={{
                fontSize: 60,
              }}
            ></i>

            <div className="mt-3">No gallery images selected.</div>
          </div>
        )}
        {existingGallery.length > 0 && (
          <div className="mb-5">
            <h5 className="mb-3">Existing Gallery</h5>

            <div className="row">
              {existingGallery.map((item) => (
                <div className="col-lg-3 col-md-4 mb-4" key={item._id}>
                  <div className="card">
                    <img
                      src={item.imageUrl}
                      className="card-img-top"
                      style={{
                        height: 180,
                        objectFit: "cover",
                      }}
                      alt=""
                    />

                    <div className="card-body p-2">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => onDeleteExisting(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceGallery;
