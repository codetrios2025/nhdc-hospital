import React from "react";

const HomeFeatureBasicInfo = ({ register, errors }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">
          <i className="bi bi-info-circle me-2"></i>
          Basic Information
        </h5>
      </div>

      <div className="card-body">
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">
            Title <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            placeholder="Enter title"
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

        {/* Subtitle */}
        <div className="mb-3">
          <label className="form-label">
            Subtitle <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            className={`form-control ${errors.subtitle ? "is-invalid" : ""}`}
            placeholder="Enter subtitle"
            {...register("subtitle", {
              required: "Subtitle is required",
              maxLength: {
                value: 150,
                message: "Maximum 150 characters allowed",
              },
            })}
          />

          {errors.subtitle && (
            <div className="invalid-feedback">{errors.subtitle.message}</div>
          )}
        </div>

        {/* Bootstrap Icon */}
        <div className="mb-3">
          <label className="form-label">
            Bootstrap Icon Class <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            className={`form-control ${errors.icon ? "is-invalid" : ""}`}
            placeholder="Example: bi bi-heart-pulse-fill"
            {...register("icon", {
              required: "Icon is required",
            })}
          />

          <small className="text-muted">
            Example:
            <br />
            bi bi-heart-pulse-fill
            <br />
            bi bi-hospital
            <br />
            bi bi-capsule
            <br />
            bi bi-emoji-smile
          </small>

          {errors.icon && (
            <div className="invalid-feedback">{errors.icon.message}</div>
          )}
        </div>

        {/* Link */}
        <div className="mb-0">
          <label className="form-label">Link</label>

          <input
            type="text"
            className="form-control"
            placeholder="/services"
            {...register("link")}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeFeatureBasicInfo;
