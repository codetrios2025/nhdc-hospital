import DepartmentStatusBadge from "./DepartmentStatusBadge";
import DepartmentActionMenu from "./DepartmentActionMenu";

const DepartmentTable = ({
  departments = [],
  loading,
  pagination,
  onPageChange,
}) => {
  if (loading) {
    return (
      <div className="card">
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Featured</th>
              <th>Status</th>
              <th>Sort</th>
              <th width="120">Action</th>
            </tr>
          </thead>

          <tbody>
            {departments.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  <i
                    className="fa fa-folder-open text-secondary mb-3"
                    style={{ fontSize: 40 }}
                  ></i>

                  <h5>No Departments Found</h5>

                  <p className="text-muted">
                    Try changing your search criteria or create a new
                    department.
                  </p>
                </td>
              </tr>
            )}

            {departments.map((department, index) => (
              <tr key={department._id}>
                <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>

                <td>
                  <strong>{department.name}</strong>

                  {department.shortDescription && (
                    <>
                      <br />
                      <small className="text-muted">
                        {department.shortDescription}
                      </small>
                    </>
                  )}
                </td>

                <td>{department.slug}</td>

                <td>
                  {department.featured ? (
                    <span className="badge bg-warning text-dark">Yes</span>
                  ) : (
                    <span className="badge bg-secondary">No</span>
                  )}
                </td>

                <td>
                  <DepartmentStatusBadge status={department.status} />
                </td>

                <td>{department.sortOrder}</td>

                <td>
                  <DepartmentActionMenu department={department} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      {pagination.totalPages > 1 && (
        <div className="card-footer d-flex justify-content-between align-items-center">
          <small>
            Showing page {pagination.page} of {pagination.totalPages}
          </small>

          <div>
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              disabled={pagination.page === 1}
              onClick={() => onPageChange(pagination.page - 1)}
            >
              Previous
            </button>

            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => onPageChange(pagination.page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;
