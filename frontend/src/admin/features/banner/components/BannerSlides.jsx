import { useFieldArray } from "react-hook-form";

const BannerSlides = ({ control, register, watch, setValue, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "slides",
  });

  /*
  |--------------------------------------------------------------------------
  | Add Slide
  |--------------------------------------------------------------------------
  */

  const handleAddSlide = () => {
    append({
      _id: null,

      desktopImage: "",

      mobileImage: "",

      desktopImageUrl: "",

      mobileImageUrl: "",

      desktopPreview: "",

      mobilePreview: "",

      displayOrder: fields.length + 1,

      status: true,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Desktop Image Change
  |--------------------------------------------------------------------------
  */

  const handleDesktopImageChange = (index, event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setValue(`slides.${index}.desktopImage`, file, {
      shouldDirty: true,
    });

    setValue(`slides.${index}.desktopPreview`, URL.createObjectURL(file));
  };

  /*
  |--------------------------------------------------------------------------
  | Mobile Image Change
  |--------------------------------------------------------------------------
  */

  const handleMobileImageChange = (index, event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setValue(`slides.${index}.mobileImage`, file, {
      shouldDirty: true,
    });

    setValue(`slides.${index}.mobilePreview`, URL.createObjectURL(file));
  };

  /*
  |--------------------------------------------------------------------------
  | Remove Slide
  |--------------------------------------------------------------------------
  */

  const handleRemoveSlide = (index) => {
    remove(index);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Banner Slides</h5>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleAddSlide}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Slide
        </button>
      </div>

      <div className="card-body">
        {fields.length === 0 && (
          <div className="text-center py-4 text-muted">No slides added.</div>
        )}

        {fields.map((field, index) => {
          const slide = watch(`slides.${index}`);

          return (
            <div key={field.id} className="border rounded p-3 mb-4 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Slide #{index + 1}</h6>

                {fields.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveSlide(index)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
              </div>

              <div className="row g-4">
                {/* ========================================= */}
                {/* Desktop Image */}
                {/* ========================================= */}

                <div className="col-lg-6">
                  <label className="form-label fw-semibold">
                    Desktop Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => handleDesktopImageChange(index, e)}
                  />

                  {(slide?.desktopPreview ||
                    slide?.desktopImageUrl ||
                    slide?.desktopImage) && (
                    <div className="mt-3">
                      <img
                        src={
                          slide.desktopPreview ||
                          slide.desktopImageUrl ||
                          `${import.meta.env.VITE_API_URL}/uploads/banners/${slide.desktopImage}`
                        }
                        alt="Desktop Preview"
                        className="img-fluid rounded border"
                        style={{
                          width: "100%",
                          height: 180,
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* ========================================= */}
                {/* Mobile Image */}
                {/* ========================================= */}

                <div className="col-lg-6">
                  <label className="form-label fw-semibold">Mobile Image</label>

                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => handleMobileImageChange(index, e)}
                  />

                  {(slide?.mobilePreview ||
                    slide?.mobileImageUrl ||
                    slide?.mobileImage) && (
                    <div className="mt-3">
                      <img
                        src={
                          slide.mobilePreview ||
                          slide.mobileImageUrl ||
                          `${import.meta.env.VITE_API_URL}/uploads/banners/${slide.mobileImage}`
                        }
                        alt="Mobile Preview"
                        className="img-fluid rounded border"
                        style={{
                          width: 250,
                          height: 350,
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* ========================================= */}
                {/* Display Order */}
                {/* ========================================= */}

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Display Order
                  </label>

                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    {...register(`slides.${index}.displayOrder`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>

                {/* ========================================= */}
                {/* Status */}
                {/* ========================================= */}

                <div className="col-md-4 d-flex align-items-end">
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      {...register(`slides.${index}.status`)}
                    />

                    <label className="form-check-label">Active</label>
                  </div>
                </div>

                {/* ========================================= */}
                {/* Hidden Mongo _id */}
                {/* ========================================= */}

                <input type="hidden" {...register(`slides.${index}._id`)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerSlides;
