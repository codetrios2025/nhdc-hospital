import { Link, useNavigate } from "react-router-dom";

import DepartmentForm from "../components/DepartmentForm";

const AddDepartmentPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/departments");
  };

  return (
    <div className="container-fluid">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">Add Department</h3>

          <p className="text-muted mb-0">Create a new hospital department</p>
        </div>

        <Link to="/departments" className="btn btn-outline-secondary">
          <i className="fa fa-arrow-left me-2"></i>
          Back to List
        </Link>
      </div>

      {/* Form */}

      <div className="card shadow-sm">
        <div className="card-body">
          <DepartmentForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentPage;
