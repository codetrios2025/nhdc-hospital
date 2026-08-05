const ContactNumbers = ({ register, errors }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">Contact Numbers</h5>
      </div>

      <div className="card-body">
        <div className="row">
          {/* Primary Contact */}
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Primary Contact Number
              <span className="text-danger">*</span>
            </label>

            <input
              type="text"
              maxLength="10"
              className={`form-control ${
                errors?.phoneNumbers?.[0] ? "is-invalid" : ""
              }`}
              placeholder="Enter primary contact number"
              {...register("phoneNumbers.0")}
            />

            {errors?.phoneNumbers?.[0] && (
              <div className="invalid-feedback">
                {errors.phoneNumbers[0].message}
              </div>
            )}
          </div>

          {/* Secondary Contact */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Secondary Contact Number</label>

            <input
              type="text"
              maxLength="10"
              className={`form-control ${
                errors?.phoneNumbers?.[1] ? "is-invalid" : ""
              }`}
              placeholder="Enter secondary contact number"
              {...register("phoneNumbers.1")}
            />

            {errors?.phoneNumbers?.[1] && (
              <div className="invalid-feedback">
                {errors.phoneNumbers[1].message}
              </div>
            )}
          </div>

          {/* Emergency */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Emergency Contact Number</label>

            <input
              type="text"
              maxLength="10"
              className={`form-control ${
                errors.emergencyNumber ? "is-invalid" : ""
              }`}
              placeholder="Enter emergency contact number"
              {...register("emergencyNumber")}
            />

            {errors.emergencyNumber && (
              <div className="invalid-feedback">
                {errors.emergencyNumber.message}
              </div>
            )}
          </div>

          {/* WhatsApp */}
          <div className="col-md-6 mb-3">
            <label className="form-label">WhatsApp Number</label>

            <input
              type="text"
              maxLength="10"
              className={`form-control ${
                errors.whatsappNumber ? "is-invalid" : ""
              }`}
              placeholder="Enter WhatsApp number"
              {...register("whatsappNumber")}
            />

            {errors.whatsappNumber && (
              <div className="invalid-feedback">
                {errors.whatsappNumber.message}
              </div>
            )}
          </div>

          {/* Reception */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Reception Number</label>

            <input
              type="text"
              className={`form-control ${
                errors.receptionNumber ? "is-invalid" : ""
              }`}
              placeholder="Enter reception number"
              {...register("receptionNumber")}
            />

            {errors.receptionNumber && (
              <div className="invalid-feedback">
                {errors.receptionNumber.message}
              </div>
            )}
          </div>

          {/* OPD */}
          <div className="col-md-6 mb-3">
            <label className="form-label">OPD Enquiry Number</label>

            <input
              type="text"
              className={`form-control ${errors.opdNumber ? "is-invalid" : ""}`}
              placeholder="Enter OPD enquiry number"
              {...register("opdNumber")}
            />

            {errors.opdNumber && (
              <div className="invalid-feedback">{errors.opdNumber.message}</div>
            )}
          </div>

          {/* Ambulance */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Ambulance Number</label>

            <input
              type="text"
              className={`form-control ${
                errors.ambulanceNumber ? "is-invalid" : ""
              }`}
              placeholder="Enter ambulance number"
              {...register("ambulanceNumber")}
            />

            {errors.ambulanceNumber && (
              <div className="invalid-feedback">
                {errors.ambulanceNumber.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactNumbers;
