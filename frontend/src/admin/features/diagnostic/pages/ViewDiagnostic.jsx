import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchDiagnostic } from "../../../redux/thunks/diagnosticThunk";

const ViewDiagnostic = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { diagnostic, loading } = useSelector((state) => state.diagnostic);

  useEffect(() => {
    dispatch(fetchDiagnostic(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!diagnostic) {
    return (
      <div className="alert alert-warning">Diagnostic Service not found.</div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Diagnostic Service Details</h2>

          <p className="text-muted mb-0">View Diagnostic Service Information</p>
        </div>

        <Link to="/admin/diagnostic-services" className="btn btn-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-4">
              <label className="fw-semibold text-muted">Title</label>

              <p className="fs-5">{diagnostic.title}</p>
            </div>

            <div className="col-md-6 mb-4">
              <label className="fw-semibold text-muted">Status</label>

              <p>
                {diagnostic.status ? (
                  <span className="badge bg-success">Active</span>
                ) : (
                  <span className="badge bg-danger">Inactive</span>
                )}
              </p>
            </div>

            <div className="col-md-12 mb-4">
              <label className="fw-semibold text-muted">
                Short Description
              </label>

              <p className="mb-0">{diagnostic.shortDescription}</p>
            </div>

            <div className="col-md-4 mb-4">
              <label className="fw-semibold text-muted">Bootstrap Icon</label>

              <div className="mt-2">
                <i
                  className={`${diagnostic.icon} ${diagnostic.iconColor || "text-primary"}`}
                  style={{ fontSize: "42px" }}
                ></i>
              </div>

              <div className="small text-muted mt-2">{diagnostic.icon}</div>
            </div>

            <div className="col-md-4 mb-4">
              <label className="fw-semibold text-muted">Icon Color</label>

              <p>{diagnostic.iconColor}</p>
            </div>

            <div className="col-md-4 mb-4">
              <label className="fw-semibold text-muted">Display Order</label>

              <p>{diagnostic.displayOrder}</p>
            </div>

            <div className="col-md-12 mb-4">
              <label className="fw-semibold text-muted">Link</label>

              <p>{diagnostic.link || "-"}</p>
            </div>

            <div className="col-md-6">
              <label className="fw-semibold text-muted">Created At</label>

              <p>
                {diagnostic.createdAt
                  ? new Date(diagnostic.createdAt).toLocaleString()
                  : "-"}
              </p>
            </div>

            <div className="col-md-6">
              <label className="fw-semibold text-muted">Updated At</label>

              <p>
                {diagnostic.updatedAt
                  ? new Date(diagnostic.updatedAt).toLocaleString()
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDiagnostic;
