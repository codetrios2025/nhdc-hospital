const StatusBadge = ({ status }) => {
  const getClass = () => {
    switch (status) {
      case "ACTIVE":
        return "status-active";

      case "INACTIVE":
        return "status-inactive";

      case "PENDING":
        return "status-pending";

      default:
        return "";
    }
  };

  return <span className={`status-badge ${getClass()}`}>{status}</span>;
};

export default StatusBadge;
