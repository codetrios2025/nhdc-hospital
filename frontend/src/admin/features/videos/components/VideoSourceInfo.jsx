const VideoSourceInfo = ({ register, watch }) => {
  const source = watch("sourceType");

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Video Source</h5>
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Source Type</label>

          <select className="form-select" {...register("sourceType")}>
            <option value="youtube">YouTube URL</option>

            <option value="upload">Upload Video</option>

            <option value="url">External URL</option>

            <option value="embed">Embed Code</option>
          </select>
        </div>

        {source === "youtube" && (
          <div className="mb-3">
            <label>YouTube URL</label>

            <input className="form-control" {...register("youtubeUrl")} />
          </div>
        )}

        {source === "url" && (
          <div className="mb-3">
            <label>External URL</label>

            <input className="form-control" {...register("externalUrl")} />
          </div>
        )}

        {source === "embed" && (
          <div className="mb-3">
            <label>Embed Code</label>

            <textarea
              rows="5"
              className="form-control"
              {...register("embedCode")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSourceInfo;
