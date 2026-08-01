import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import useDebounce from "../../../hooks/useDebounce";

import {
  fetchDiagnostics,
  deleteDiagnostic,
} from "../../../redux/thunks/diagnosticThunk";

import DiagnosticTable from "../components/DiagnosticTable";
import DiagnosticFilters from "../components/DiagnosticFilters";

import { TablePagination } from "../../../components/common/DataTable";

const DiagnosticList = () => {
  const dispatch = useDispatch();

  const { diagnostics, loading, error, pagination } = useSelector(
    (state) => state.diagnostic,
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    loadDiagnostics();
  }, [dispatch, page, limit, debouncedSearch, status]);

  const loadDiagnostics = () => {
    dispatch(
      fetchDiagnostics({
        page,
        limit,
        keyword: debouncedSearch,
        status,
      }),
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Diagnostic Service?",
      text: "You won't be able to recover this record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(deleteDiagnostic(id));

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Diagnostic Service deleted successfully.",
        timer: 1200,
        showConfirmButton: false,
      });

      loadDiagnostics();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to delete Diagnostic Service.",
      });
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Diagnostic Service Management</h2>

          <p className="text-muted mb-0">Manage Diagnostic Services</p>
        </div>

        <Link
          to="/admin/diagnostic-services/create"
          className="btn btn-primary"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Diagnostic Service
        </Link>
      </div>

      {/* Filters */}

      <DiagnosticFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        limit={limit}
        setLimit={setLimit}
      />

      {/* Error */}

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Table */}

      <DiagnosticTable
        diagnostics={diagnostics}
        loading={loading}
        reloadDiagnostics={loadDiagnostics}
        deleteDiagnostic={handleDelete}
        page={pagination?.page || 1}
        limit={pagination?.limit || 10}
      />

      {/* Pagination */}

      <TablePagination
        page={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default DiagnosticList;
