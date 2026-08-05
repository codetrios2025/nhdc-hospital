const ContactSeo = ({ register, errors }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">SEO Settings</h5>
      </div>

      <div className="card-body">
        <div className="row">
          {/* Meta Title */}
          <div className="col-12 mb-3">
            <label className="form-label">Meta Title</label>

            <input
              type="text"
              className={`form-control ${
                errors?.seo?.metaTitle ? "is-invalid" : ""
              }`}
              placeholder="Enter meta title"
              maxLength={60}
              {...register("seo.metaTitle")}
            />

            {errors?.seo?.metaTitle && (
              <div className="invalid-feedback">
                {errors.seo.metaTitle.message}
              </div>
            )}

            <small className="text-muted">
              Recommended length: 50–60 characters.
            </small>
          </div>

          {/* Meta Description */}
          <div className="col-12 mb-3">
            <label className="form-label">Meta Description</label>

            <textarea
              rows={4}
              className={`form-control ${
                errors?.seo?.metaDescription ? "is-invalid" : ""
              }`}
              placeholder="Enter meta description"
              maxLength={160}
              {...register("seo.metaDescription")}
            />

            {errors?.seo?.metaDescription && (
              <div className="invalid-feedback">
                {errors.seo.metaDescription.message}
              </div>
            )}

            <small className="text-muted">
              Recommended length: 150–160 characters.
            </small>
          </div>

          {/* Meta Keywords */}
          <div className="col-12 mb-3">
            <label className="form-label">Meta Keywords</label>

            <input
              type="text"
              className={`form-control ${
                errors?.seo?.metaKeywords ? "is-invalid" : ""
              }`}
              placeholder="hospital, diagnostic centre, pathology, MRI"
              {...register("seo.metaKeywords")}
            />

            {errors?.seo?.metaKeywords && (
              <div className="invalid-feedback">
                {errors.seo.metaKeywords.message}
              </div>
            )}

            <small className="text-muted">
              Enter keywords separated by commas (,).
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSeo;
