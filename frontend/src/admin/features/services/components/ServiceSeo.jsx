const ServiceSeo = ({ register }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>SEO Information</h5>
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label>SEO Title</label>

          <input className="form-control" {...register("seoTitle")} />
        </div>

        <div className="mb-3">
          <label>SEO Description</label>

          <textarea
            rows={3}
            className="form-control"
            {...register("seoDescription")}
          />
        </div>

        <div>
          <label>SEO Keywords</label>

          <input
            className="form-control"
            placeholder="child, vaccination, pediatric..."
            {...register("seoKeywords")}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceSeo;
