import ServiceDropdown from "../../../components/common/ServiceDropdown";

const ServiceTestFilters = ({
  keyword,
  setKeyword,
  service,
  setService,
  status,
  setStatus,
  limit,
  setLimit,
}) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row g-3">
          {/* Search */}

          <div className="col-lg-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search Test Name..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* Service */}

          <div className="col-lg-3">
            <ServiceDropdown
              showLabel={false}
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </div>

          {/* Status */}

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

          {/* Page Size */}

          <div className="col-lg-2">
            <select
              className="form-select"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={10}>10</option>

              <option value={25}>25</option>

              <option value={50}>50</option>

              <option value={100}>100</option>
            </select>
          </div>

          {/* Clear */}

          <div className="col-lg-1">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                setKeyword("");
                setService("");
                setStatus("");
                setLimit(10);
              }}
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTestFilters;
