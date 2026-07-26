import { FaEye, FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";

const ActionMenu = ({
  onView,

  onEdit,

  onDelete,
}) => {
  return (
    <div className="dropdown">
      <button className="btn btn-light" data-bs-toggle="dropdown">
        <FaEllipsisV />
      </button>

      <ul className="dropdown-menu">
        <li>
          <button className="dropdown-item" onClick={onView}>
            <FaEye />
            View
          </button>
        </li>

        <li>
          <button className="dropdown-item" onClick={onEdit}>
            <FaEdit />
            Edit
          </button>
        </li>

        <li>
          <button className="dropdown-item text-danger" onClick={onDelete}>
            <FaTrash />
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ActionMenu;
