const colors = {
  New: "secondary",

  Confirmed: "success",

  Visited: "primary",

  Cancelled: "danger",
};

const AppointmentStatusBadge = ({ status }) => {
  return (
    <span className={`badge bg-${colors[status] || "secondary"}`}>
      {status}
    </span>
  );
};

export default AppointmentStatusBadge;
