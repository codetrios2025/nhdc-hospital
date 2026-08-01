const HomeFeatureFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  limit,
  setLimit,
}) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-5">
            <label className="form-label">Search</label>

            <input
              type="text"
              className="form-control"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Status</label>

            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All</option>

              <option value="true">Active</option>

              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">Rows</label>

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
        </div>
      </div>
    </div>
  );
};

export default HomeFeatureFilters;
