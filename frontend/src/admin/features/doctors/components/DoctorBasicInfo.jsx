import React from "react";
import DepartmentDropdown from "../../../components/common/DepartmentDropdown";

const DoctorBasicInfo = ({ register, errors }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Basic Information</h5>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>First Name</label>

            <input
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              {...register("firstName", {
                required: "First Name is required",
              })}
            />

            <div className="invalid-feedback">{errors.firstName?.message}</div>
          </div>

          <div className="col-md-6 mb-3">
            <label>Last Name</label>

            <input className="form-control" {...register("lastName")} />
          </div>

          <div className="col-md-6 mb-3">
            {/* <label>Department</label> */}
            <DepartmentDropdown
              register={register}
              name="department"
              required
              error={errors.department}
            />

            {/* <select
              className={`form-select ${errors.department ? "is-invalid" : ""}`}
              {...register("department", {
                required: "Department is required",
              })}
            >
              <option value="">Select Department</option>

              <option value="Cardiology">Cardiology</option>

              <option value="Neurology">Neurology</option>

              <option value="Orthopedic">Orthopedic</option>

              <option value="Dermatology">Dermatology</option>

              <option value="ENT">ENT</option>

              <option value="Gynecology">Gynecology</option>

              <option value="Ophthalmology">Ophthalmology</option>

              <option value="Pediatrics">Pediatrics</option>
            </select> */}

            <div className="invalid-feedback">{errors.department?.message}</div>
          </div>

          <div className="col-md-6 mb-3">
            <label>Designation</label>

            <input
              className={`form-control ${
                errors.designation ? "is-invalid" : ""
              }`}
              {...register("designation", {
                required: "Designation is required",
              })}
            />

            <div className="invalid-feedback">
              {errors.designation?.message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorBasicInfo;
