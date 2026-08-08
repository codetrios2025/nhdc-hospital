const VideoSettings = ({ register }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Settings</h5>
      </div>

      <div className="card-body">
        <div className="form-check form-switch mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            {...register("isActive")}
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
            {...register("featured")}
          />

          <label className="form-check-label">Featured Video</label>
        </div>
      </div>
    </div>
  );
};

export default VideoSettings;
