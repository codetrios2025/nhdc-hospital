import { Link } from "react-router-dom";

import DoctorForm from "../components/DoctorForm";

const DoctorCreate = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Add Doctor</h2>

          <p className="text-muted">Create a new doctor profile</p>
        </div>

        <Link to="/admin/doctors" className="btn btn-secondary">
          <i className="bi bi-arrow-left"></i>
          Back
        </Link>
      </div>

      <DoctorForm />
    </div>
  );
};

export default DoctorCreate;
