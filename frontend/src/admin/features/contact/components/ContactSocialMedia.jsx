const ContactSocialMedia = ({ register, errors }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">Social Media Links</h5>
      </div>

      <div className="card-body">
        <div className="row">
          {/* Facebook */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Facebook</label>

            <input
              type="url"
              className={`form-control ${
                errors?.socialMedia?.facebook ? "is-invalid" : ""
              }`}
              placeholder="https://facebook.com/yourpage"
              {...register("socialMedia.facebook")}
            />

            {errors?.socialMedia?.facebook && (
              <div className="invalid-feedback">
                {errors.socialMedia.facebook.message}
              </div>
            )}
          </div>

          {/* Instagram */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Instagram</label>

            <input
              type="url"
              className={`form-control ${
                errors?.socialMedia?.instagram ? "is-invalid" : ""
              }`}
              placeholder="https://instagram.com/yourpage"
              {...register("socialMedia.instagram")}
            />

            {errors?.socialMedia?.instagram && (
              <div className="invalid-feedback">
                {errors.socialMedia.instagram.message}
              </div>
            )}
          </div>

          {/* Twitter */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Twitter (X)</label>

            <input
              type="url"
              className={`form-control ${
                errors?.socialMedia?.twitter ? "is-invalid" : ""
              }`}
              placeholder="https://twitter.com/yourpage"
              {...register("socialMedia.twitter")}
            />

            {errors?.socialMedia?.twitter && (
              <div className="invalid-feedback">
                {errors.socialMedia.twitter.message}
              </div>
            )}
          </div>

          {/* LinkedIn */}
          <div className="col-md-6 mb-3">
            <label className="form-label">LinkedIn</label>

            <input
              type="url"
              className={`form-control ${
                errors?.socialMedia?.linkedin ? "is-invalid" : ""
              }`}
              placeholder="https://linkedin.com/company/yourcompany"
              {...register("socialMedia.linkedin")}
            />

            {errors?.socialMedia?.linkedin && (
              <div className="invalid-feedback">
                {errors.socialMedia.linkedin.message}
              </div>
            )}
          </div>

          {/* YouTube */}
          <div className="col-md-12 mb-3">
            <label className="form-label">YouTube</label>

            <input
              type="url"
              className={`form-control ${
                errors?.socialMedia?.youtube ? "is-invalid" : ""
              }`}
              placeholder="https://youtube.com/@yourchannel"
              {...register("socialMedia.youtube")}
            />

            {errors?.socialMedia?.youtube && (
              <div className="invalid-feedback">
                {errors.socialMedia.youtube.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSocialMedia;
