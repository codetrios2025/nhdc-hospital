const AppointmentActionMenu = ({
  appointment,
  onView,
  onStatus,
  onRemarks,
  onDelete,
}) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-light btn-sm border"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="pi pi-ellipsis-v"></i>
      </button>

      <ul className="dropdown-menu dropdown-menu-end shadow">
        <li>
          <button
            type="button"
            className="dropdown-item"
            onClick={() => onView(appointment)}
          >
            <i className="pi pi-eye text-primary me-2"></i>
            View Details
          </button>
        </li>

        <li>
          <button
            type="button"
            className="dropdown-item"
            onClick={() => onStatus(appointment)}
          >
            <i className="pi pi-check-circle text-success me-2"></i>
            Update Status
          </button>
        </li>

        <li>
          <button
            type="button"
            className="dropdown-item"
            onClick={() => onRemarks(appointment)}
          >
            <i className="pi pi-comments text-warning me-2"></i>
            Add Remarks
          </button>
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <button
            type="button"
            className="dropdown-item text-danger"
            onClick={() => onDelete(appointment)}
          >
            <i className="pi pi-trash me-2"></i>
            Delete Appointment
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AppointmentActionMenu;
