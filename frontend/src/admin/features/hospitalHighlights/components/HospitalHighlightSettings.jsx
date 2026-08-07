const HospitalHighlightSettings = ({ register, errors }) => {
  return (
    <>
      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">Settings</h5>
        </div>

        <div className="card-body">
          {/* Display Order */}
          <div className="mb-3">
            <label className="form-label">
              Display Order <span className="text-danger">*</span>
            </label>

            <input
              type="number"
              min="1"
              className={`form-control ${errors.order ? "is-invalid" : ""}`}
              placeholder="1"
              {...register("order", {
                required: "Display Order is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Display Order must be at least 1",
                },
              })}
            />

            {errors.order && (
              <div className="invalid-feedback">{errors.order.message}</div>
            )}
          </div>

          {/* Status */}
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="isActive"
              {...register("isActive")}
            />

            <label className="form-check-label" htmlFor="isActive">
              Active
            </label>
          </div>

          <small className="text-muted d-block mt-2">
            Inactive highlights will not be displayed on the website.
          </small>
        </div>
      </div>

      {/* Preview */}
      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Preview</h5>
        </div>

        <div className="card-body text-center">
          <div
            style={{
              fontSize: "36px",
              color: "#0d6efd",
            }}
          >
            <i className="pi pi-star"></i>
          </div>

          <small className="text-muted">
            The icon preview will be visible on the website based on the Icon
            Class entered.
          </small>
        </div>
      </div>
    </>
  );
};

export default HospitalHighlightSettings;
