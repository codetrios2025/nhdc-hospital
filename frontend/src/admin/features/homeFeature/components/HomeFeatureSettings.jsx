import React from "react";

const HomeFeatureSettings = ({ register }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">
          <i className="bi bi-gear me-2"></i>
          Settings
        </h5>
      </div>

      <div className="card-body">
        {/* Display Order */}
        <div className="mb-4">
          <label className="form-label">Display Order</label>

          <input
            type="number"
            min="0"
            className="form-control"
            {...register("displayOrder", {
              valueAsNumber: true,
            })}
          />
        </div>

        {/* Status */}
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="status"
            {...register("status")}
          />

          <label className="form-check-label" htmlFor="status">
            Active
          </label>
        </div>
      </div>
    </div>
  );
};

export default HomeFeatureSettings;
