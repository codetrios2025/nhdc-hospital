const DiagnosticSettings = ({ register }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Settings</h5>
      </div>

      <div className="card-body">
        <div className="mb-4">
          <label className="form-label">Display Order</label>

          <input
            type="number"
            className="form-control"
            {...register("displayOrder")}
          />
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            {...register("status")}
          />

          <label className="form-check-label">Active</label>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticSettings;
