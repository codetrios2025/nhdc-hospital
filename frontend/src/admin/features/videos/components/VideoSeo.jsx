const VideoSeo = ({ register }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">SEO Information</h5>
      </div>

      <div className="card-body">
        {/* SEO Title */}

        <div className="mb-3">
          <label className="form-label">SEO Title</label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter SEO title"
            {...register("seoTitle")}
          />
        </div>

        {/* SEO Description */}

        <div className="mb-3">
          <label className="form-label">SEO Description</label>

          <textarea
            rows={4}
            className="form-control"
            placeholder="Enter SEO description"
            {...register("seoDescription")}
          />
        </div>

        {/* SEO Keywords */}

        <div>
          <label className="form-label">SEO Keywords</label>

          <input
            type="text"
            className="form-control"
            placeholder="video, hospital, doctor, health"
            {...register("seoKeywords")}
          />

          <small className="text-muted">Separate keywords with commas.</small>
        </div>
      </div>
    </div>
  );
};

export default VideoSeo;
