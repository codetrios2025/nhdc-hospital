import DepartmentFilter from "../../../components/common/DepartmentFilter";
const departments = [
  "General Medicine",
  "Child Specialist",
  "Orthopedic",
  "Gynecology",
  "ENT",
  "Cardiology",
  "Neurology",
  "Radiology",
];

const ServiceFilters = ({
  search,
  setSearch,
  department,
  setDepartment,
  status,
  setStatus,
  limit,
  setLimit,
}) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-lg-4">
            <input
              className="form-control"
              placeholder="Search Service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-lg-3">
            <DepartmentFilter
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="col-lg-2">
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>

              <option value="true">Active</option>

              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="col-lg-2">
            <select
              className="form-select"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value="10">10</option>

              <option value="25">25</option>

              <option value="50">50</option>

              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceFilters;
