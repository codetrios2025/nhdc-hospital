const ContactGoogleMap = ({ register, errors }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">Google Map</h5>
      </div>

      <div className="card-body">
        <div className="row">
          {/* Google Map Embed URL */}
          <div className="col-12 mb-3">
            <label className="form-label">Google Map Embed URL</label>

            <textarea
              rows={4}
              className={`form-control ${
                errors?.googleMap?.embedUrl ? "is-invalid" : ""
              }`}
              placeholder="Paste Google Map Embed URL"
              {...register("googleMap.embedUrl")}
            />

            {errors?.googleMap?.embedUrl && (
              <div className="invalid-feedback">
                {errors.googleMap.embedUrl.message}
              </div>
            )}

            <small className="text-muted">
              Go to Google Maps → Share → Embed a map → Copy HTML → Paste only
              the iframe src URL or embed URL.
            </small>
          </div>

          {/* Latitude */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Latitude</label>

            <input
              type="text"
              className={`form-control ${
                errors?.googleMap?.latitude ? "is-invalid" : ""
              }`}
              placeholder="e.g. 26.166245"
              {...register("googleMap.latitude")}
            />

            {errors?.googleMap?.latitude && (
              <div className="invalid-feedback">
                {errors.googleMap.latitude.message}
              </div>
            )}
          </div>

          {/* Longitude */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Longitude</label>

            <input
              type="text"
              className={`form-control ${
                errors?.googleMap?.longitude ? "is-invalid" : ""
              }`}
              placeholder="e.g. 75.788513"
              {...register("googleMap.longitude")}
            />

            {errors?.googleMap?.longitude && (
              <div className="invalid-feedback">
                {errors.googleMap.longitude.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactGoogleMap;
