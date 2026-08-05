const ContactBasicInfo = ({ register, errors }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">Basic Information</h5>
      </div>

      <div className="card-body">
        <div className="row">
          {/* Hospital Name */}
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Hospital Name <span className="text-danger">*</span>
            </label>

            <input
              type="text"
              className={`form-control ${
                errors.hospitalName ? "is-invalid" : ""
              }`}
              placeholder="Enter hospital name"
              {...register("hospitalName")}
            />

            {errors.hospitalName && (
              <div className="invalid-feedback">
                {errors.hospitalName.message}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Email <span className="text-danger">*</span>
            </label>

            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter email address"
              {...register("email")}
            />

            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Contact Form Recipient */}
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Contact Form Recipient
              <span className="text-danger">*</span>
            </label>

            <input
              type="email"
              className={`form-control ${
                errors.contactFormRecipient ? "is-invalid" : ""
              }`}
              placeholder="Enter recipient email"
              {...register("contactFormRecipient")}
            />

            {errors.contactFormRecipient && (
              <div className="invalid-feedback">
                {errors.contactFormRecipient.message}
              </div>
            )}
          </div>

          {/* Address */}
          <div className="col-md-12 mb-3">
            <label className="form-label">
              Address <span className="text-danger">*</span>
            </label>

            <textarea
              rows="4"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              placeholder="Enter complete hospital address"
              {...register("address")}
            />

            {errors.address && (
              <div className="invalid-feedback">{errors.address.message}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBasicInfo;
