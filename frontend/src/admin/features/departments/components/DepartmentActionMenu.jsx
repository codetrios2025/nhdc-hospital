import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { deleteDepartment } from "../../../redux/thunks/departmentThunk";

const DepartmentActionMenu = ({ department }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    Swal.fire({
      title: "Delete Department?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDepartment(department._id));
      }
    });
  };

  return (
    <div className="d-flex justify-content-center">
      {/* View */}
      <Link
        to={`/departments/view/${department._id}`}
        className="btn btn-info btn-sm rounded-0"
        title="View"
      >
        <i className="bi bi-eye"></i>
      </Link>

      {/* Edit */}
      <Link
        to={`/departments/edit/${department._id}`}
        className="btn btn-warning btn-sm rounded-0"
        title="Edit"
      >
        <i className="bi bi-pencil"></i>
      </Link>

      {/* Delete */}
      <button
        type="button"
        className="btn btn-danger btn-sm rounded-0"
        title="Delete"
        onClick={handleDelete}
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
};

export default DepartmentActionMenu;
