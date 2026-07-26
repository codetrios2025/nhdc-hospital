import { Link } from "react-router-dom";

import ServiceForm from "../components/ServiceForm";

const ServiceCreate = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Add Service</h2>

          <p className="text-muted">Create a new hospital service</p>
        </div>

        <Link to="/admin/services" className="btn btn-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </Link>
      </div>

      <ServiceForm />
    </div>
  );
};

export default ServiceCreate;
