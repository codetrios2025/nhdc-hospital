import React from "react";

const departments = [
  "General Medicine",
  "Child Specialist",
  "Orthopedic",
  "Gynecology",
  "ENT",
  "Cardiology",
  "Neurology",
  "Radiology",
  "Pathology",
];

const ServiceBasicInfo = ({ register, errors }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Basic Information</h5>
      </div>

      <div className="card-body">
        <div className="row">
          {/* Title */}

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Service Title <span className="text-danger">*</span>
            </label>

            <input
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              {...register("title", {
                required: "Service title is required",
              })}
            />

            <div className="invalid-feedback">{errors.title?.message}</div>
          </div>

          {/* Department */}

          <div className="col-md-6 mb-3">
            <label className="form-label">Department</label>

            <select
              className={`form-select ${errors.department ? "is-invalid" : ""}`}
              {...register("department")}
            >
              <option value="">Select Department</option>

              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <div className="invalid-feedback">{errors.department?.message}</div>
          </div>

          {/* Theme Color */}

          <div className="col-md-4 mb-3">
            <label className="form-label">Theme Color</label>

            <input
              type="color"
              className="form-control form-control-color"
              {...register("themeColor")}
            />
          </div>

          {/* Display Order */}

          <div className="col-md-4 mb-3">
            <label className="form-label">Display Order</label>

            <input
              type="number"
              className="form-control"
              {...register("displayOrder")}
            />
          </div>

          {/* Icon */}

          <div className="col-md-4 mb-3">
            <label className="form-label">Bootstrap Icon</label>

            <input
              className="form-control"
              placeholder="bi bi-heart-pulse"
              {...register("icon")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBasicInfo;
