const DepartmentStatusBadge = ({ status }) => {
  return status ? (
    <span className="badge bg-success">Active</span>
  ) : (
    <span className="badge bg-danger">Inactive</span>
  );
};

export default DepartmentStatusBadge;
