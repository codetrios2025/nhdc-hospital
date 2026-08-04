import ServiceDropdown from "../../../components/common/ServiceDropdown";

const ServiceTestBasicInfo = ({ register, errors }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Basic Information</h5>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <input type="hidden" {...register("service")} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Test Name <span className="text-danger">*</span>
            </label>

            <input
              className={`form-control ${errors.testName ? "is-invalid" : ""}`}
              {...register("testName", {
                required: "Test name is required",
              })}
            />

            <div className="invalid-feedback">{errors.testName?.message}</div>
          </div>

          <div className="col-md-12 mb-3">
            <label className="form-label">Subtitle</label>

            <input className="form-control" {...register("subtitle")} />
          </div>

          <div className="col-md-12 mb-3">
            <label className="form-label">Description</label>

            <textarea
              rows={5}
              className="form-control"
              {...register("description")}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Display Order</label>

            <input
              type="number"
              className="form-control"
              {...register("displayOrder")}
            />
          </div>

          <div className="col-md-6 d-flex align-items-end">
            <div className="form-check mb-3">
              <input
                id="status"
                type="checkbox"
                className="form-check-input"
                {...register("status")}
              />

              <label htmlFor="status" className="form-check-label">
                Active
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTestBasicInfo;
