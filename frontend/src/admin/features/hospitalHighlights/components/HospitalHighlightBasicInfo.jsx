const HospitalHighlightBasicInfo = ({ register, errors }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">Basic Information</h5>
      </div>

      <div className="card-body">
        {/* Value */}
        <div className="mb-3">
          <label className="form-label">
            Value <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            className={`form-control ${errors.value ? "is-invalid" : ""}`}
            placeholder="25+"
            {...register("value", {
              required: "Value is required",
              maxLength: {
                value: 50,
                message: "Maximum 50 characters allowed",
              },
            })}
          />

          {errors.value && (
            <div className="invalid-feedback">{errors.value.message}</div>
          )}
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="form-label">
            Title <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            placeholder="Years of Service"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 100,
                message: "Maximum 100 characters allowed",
              },
            })}
          />

          {errors.title && (
            <div className="invalid-feedback">{errors.title.message}</div>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">
            Description <span className="text-danger">*</span>
          </label>

          <textarea
            rows={5}
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            placeholder="Enter description"
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 500,
                message: "Maximum 500 characters allowed",
              },
            })}
          />

          {errors.description && (
            <div className="invalid-feedback">{errors.description.message}</div>
          )}
        </div>

        {/* Icon */}
        <div className="mb-0">
          <label className="form-label">
            Icon Class <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            className={`form-control ${errors.icon ? "is-invalid" : ""}`}
            placeholder="pi pi-users"
            {...register("icon", {
              required: "Icon is required",
              maxLength: {
                value: 100,
                message: "Maximum 100 characters allowed",
              },
            })}
          />

          <small className="text-muted d-block mt-1">
            Example: <code>pi pi-users</code>, <code>pi pi-heart</code>,{" "}
            <code>pi pi-star</code>, <code>pi pi-building</code>
          </small>

          {errors.icon && (
            <div className="invalid-feedback">{errors.icon.message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalHighlightBasicInfo;
