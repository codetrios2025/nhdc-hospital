const DiagnosticBasicInfo = ({ register, errors }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Basic Information</h5>
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">
            Title <span className="text-danger">*</span>
          </label>

          <input
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title", {
              required: "Title is required",
            })}
          />

          <div className="invalid-feedback">{errors.title?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Short Description</label>

          <textarea
            rows="4"
            className={`form-control ${
              errors.shortDescription ? "is-invalid" : ""
            }`}
            {...register("shortDescription", {
              required: "Short Description is required",
            })}
          />

          <div className="invalid-feedback">
            {errors.shortDescription?.message}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Bootstrap Icon</label>

            <input
              className="form-control"
              placeholder="bi bi-lungs-fill"
              {...register("icon", {
                required: true,
              })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Icon Color</label>

            <input
              type="text"
              className="form-control"
              placeholder="text-primary"
              {...register("iconColor")}
            />

            <div className="form-text">
              Optional. Example: text-primary, text-success, text-danger,
              text-warning, text-info, text-secondary, text-dark
            </div>
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label">Link</label>

          <input
            className="form-control"
            placeholder="/diagnostics/spirometry"
            {...register("link")}
          />
        </div>
      </div>
    </div>
  );
};

export default DiagnosticBasicInfo;
