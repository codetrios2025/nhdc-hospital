import { Link } from "react-router-dom";

const ServiceActionButtons = ({ service, onDelete }) => {
  return (
    <div className="btn-group">
      <Link
        to={`/admin/services/${service._id}`}
        className="btn btn-info btn-sm"
      >
        <i className="bi bi-eye"></i>
      </Link>

      <Link
        to={`/admin/services/${service._id}/edit`}
        className="btn btn-warning btn-sm"
      >
        <i className="bi bi-pencil"></i>
      </Link>

      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(service._id)}
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
};

export default ServiceActionButtons;
