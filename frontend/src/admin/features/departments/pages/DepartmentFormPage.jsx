import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DepartmentForm from "../components/DepartmentForm";

import { fetchDepartment } from "../../../redux/thunks/departmentThunk";

import { clearDepartment } from "../../../redux/slices/departmentSlice";

const DepartmentFormPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const { department, loading } = useSelector((state) => state.departments);

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchDepartment(id));
    }

    return () => {
      dispatch(clearDepartment());
    };
  }, [dispatch, id, isEdit]);

  const handleSuccess = () => {
    navigate("/departments");
  };

  if (isEdit && loading && !department) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>

          <p className="mt-3">Loading Department...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3>{isEdit ? "Edit Department" : "Add Department"}</h3>

          <p className="text-muted mb-0">
            {isEdit
              ? "Update department information"
              : "Create a new department"}
          </p>
        </div>

        <Link to="/departments" className="btn btn-outline-secondary">
          <i className="fa fa-arrow-left me-2"></i>
          Back
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <DepartmentForm department={department} onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default DepartmentFormPage;
