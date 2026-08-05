const ContactWorkingHours = ({ register, errors }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">Working Hours</h5>
      </div>

      <div className="card-body">
        <div className="row">
          {/* Monday - Saturday Morning */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Monday - Saturday (Morning)</label>

            <input
              type="text"
              className={`form-control ${
                errors?.workingHours?.mondaySaturday?.morning
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="e.g. 09:00 AM - 02:00 PM"
              {...register("workingHours.mondaySaturday.morning")}
            />

            {errors?.workingHours?.mondaySaturday?.morning && (
              <div className="invalid-feedback">
                {errors.workingHours.mondaySaturday.morning.message}
              </div>
            )}
          </div>

          {/* Monday - Saturday Evening */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Monday - Saturday (Evening)</label>

            <input
              type="text"
              className={`form-control ${
                errors?.workingHours?.mondaySaturday?.evening
                  ? "is-invalid"
                  : ""
              }`}
              placeholder="e.g. 05:00 PM - 08:00 PM"
              {...register("workingHours.mondaySaturday.evening")}
            />

            {errors?.workingHours?.mondaySaturday?.evening && (
              <div className="invalid-feedback">
                {errors.workingHours.mondaySaturday.evening.message}
              </div>
            )}
          </div>

          {/* Sunday Morning */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Sunday (Morning)</label>

            <input
              type="text"
              className={`form-control ${
                errors?.workingHours?.sunday?.morning ? "is-invalid" : ""
              }`}
              placeholder="e.g. 09:00 AM - 01:00 PM"
              {...register("workingHours.sunday.morning")}
            />

            {errors?.workingHours?.sunday?.morning && (
              <div className="invalid-feedback">
                {errors.workingHours.sunday.morning.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWorkingHours;
