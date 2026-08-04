import { Link } from "react-router-dom";

const ServiceTestActionButtons = ({ test, onDelete, onEdit, onView }) => {
  return (
    <div className="btn-group" role="group">
      {/* View */}

      <button
        type="button"
        className="btn btn-info btn-sm"
        onClick={() => onEdit(test)}
      >
        <i className="bi bi-eye"></i>
      </button>

      {/* Edit */}

      <button
        type="button"
        className="btn btn-warning btn-sm"
        onClick={() => onEdit(test)}
      >
        <i className="bi bi-pencil"></i>
      </button>

      {/* Delete */}

      <button
        type="button"
        className="btn btn-danger btn-sm"
        title="Delete"
        onClick={() => onDelete(test._id)}
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
};

export default ServiceTestActionButtons;
