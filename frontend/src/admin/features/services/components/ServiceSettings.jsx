const ServiceSettings = ({ register }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Settings</h5>
      </div>

      <div className="card-body">
        <div className="form-check form-switch mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            {...register("status")}
          />

          <label className="form-check-label">Active</label>
        </div>

        <div className="form-check form-switch mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            {...register("showOnHome")}
          />

          <label className="form-check-label">Show On Home Page</label>
        </div>

        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            {...register("isFeatured")}
          />

          <label className="form-check-label">Featured Service</label>
        </div>
      </div>
    </div>
  );
};

export default ServiceSettings;
