import { useFieldArray } from "react-hook-form";

const BannerFeatures = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  /*
  |--------------------------------------------------------------------------
  | Add Feature
  |--------------------------------------------------------------------------
  */

  const handleAddFeature = () => {
    append({
      title: "",
      icon: "bi bi-check-circle-fill",
      sortOrder: fields.length + 1,
    });
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Banner Features</h5>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleAddFeature}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Feature
        </button>
      </div>

      <div className="card-body">
        {fields.length === 0 && (
          <div className="text-center text-muted py-3">No features added.</div>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="border rounded p-3 mb-3 bg-light">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">Feature #{index + 1}</h6>

              {fields.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => remove(index)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              )}
            </div>

            <div className="row g-3">
              {/* Feature Title */}

              <div className="col-md-6">
                <label className="form-label">Feature Title</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="24x7 Emergency"
                  {...register(`features.${index}.title`)}
                />
              </div>

              {/* Feature Icon */}

              <div className="col-md-4">
                <label className="form-label">Bootstrap Icon</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="bi bi-check-circle-fill"
                  {...register(`features.${index}.icon`)}
                />

                <small className="text-muted">
                  Example: bi bi-heart-pulse, bi bi-hospital, bi bi-activity
                </small>
              </div>

              {/* Sort Order */}

              <div className="col-md-2">
                <label className="form-label">Order</label>

                <input
                  type="number"
                  min="1"
                  className="form-control"
                  {...register(`features.${index}.sortOrder`, {
                    valueAsNumber: true,
                  })}
                />
              </div>

              {/* Hidden Mongo _id */}

              <input type="hidden" {...register(`features.${index}._id`)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerFeatures;
