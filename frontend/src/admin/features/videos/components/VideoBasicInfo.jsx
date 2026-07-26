const VideoBasicInfo = ({ register, errors }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Video Information</h5>
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Title</label>

          <input
            className="form-control"
            {...register("title", {
              required: "Title is required",
            })}
          />

          <small className="text-danger">{errors.title?.message}</small>
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>

          <input className="form-control" {...register("category")} />
        </div>

        <div className="mb-3">
          <label className="form-label">Short Description</label>

          <textarea
            rows="3"
            className="form-control"
            {...register("shortDescription")}
          />
        </div>

        <div>
          <label className="form-label">Description</label>

          <textarea
            rows="5"
            className="form-control"
            {...register("description")}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoBasicInfo;
