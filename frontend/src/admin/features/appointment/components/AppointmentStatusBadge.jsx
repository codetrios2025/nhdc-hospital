const STATUS_CONFIG = {
  New: {
    className: "bg-warning text-dark",
    icon: "pi pi-clock",
  },

  Confirmed: {
    className: "bg-success",
    icon: "pi pi-check-circle",
  },

  Visited: {
    className: "bg-primary",
    icon: "pi pi-check-square",
  },

  Cancelled: {
    className: "bg-danger",
    icon: "pi pi-times-circle",
  },
};

const AppointmentStatusBadge = ({ status = "New" }) => {
  const config = STATUS_CONFIG[status] || {
    className: "bg-secondary",
    icon: "pi pi-info-circle",
  };

  return (
    <span
      className={`badge rounded-pill ${config.className}`}
      style={{
        minWidth: "115px",
        fontSize: "12px",
        padding: "7px 12px",
      }}
    >
      <i className={`${config.icon} me-2`}></i>

      {status}
    </span>
  );
};

export default AppointmentStatusBadge;
