const AppointmentActionMenu = ({
  appointment,

  onView,

  onStatus,

  onDelete,
}) => {
  return (
    <div className="dropdown">
      <button className="btn btn-light btn-sm" data-bs-toggle="dropdown">
        •••
      </button>

      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <button className="dropdown-item" onClick={() => onView(appointment)}>
            View
          </button>
        </li>

        <li>
          <button
            className="dropdown-item"
            onClick={() => onStatus(appointment)}
          >
            Update Status
          </button>
        </li>

        <li>
          <button
            className="dropdown-item text-danger"
            onClick={() => onDelete(appointment)}
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AppointmentActionMenu;
