import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppointmentFilters from "../components/AppointmentFilters";
import AppointmentTable from "../components/AppointmentTable";
import AppointmentViewModal from "../components/AppointmentViewModal";
import AppointmentStatusModal from "../components/AppointmentStatusModal";
import AppointmentRemarksModal from "../components/AppointmentRemarksModal";

import {
  fetchAppointments,
  deleteAppointment,
  updateAppointmentStatus,
  saveAppointmentRemarks,
} from "../../../redux/thunks/appointmentThunk";

import useDebounce from "../../../hooks/useDebounce";

const AppointmentListPage = () => {
  const dispatch = useDispatch();

  const { appointments, pagination, loading, error } = useSelector(
    (state) => state.appointments,
  );

  /* ----------------------------------------------------
   * Filters
   * --------------------------------------------------*/

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const debouncedSearch = useDebounce(search, 500);

  /* ----------------------------------------------------
   * Modal State
   * --------------------------------------------------*/

  const [showViewModal, setShowViewModal] = useState(false);

  const [showStatusModal, setShowStatusModal] = useState(false);

  const [showRemarksModal, setShowRemarksModal] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  /* ----------------------------------------------------
   * Load Appointment List
   * --------------------------------------------------*/

  useEffect(() => {
    dispatch(
      fetchAppointments({
        page,
        limit,
        keyword: debouncedSearch,
        status,
        appointmentDate,
      }),
    );
  }, [dispatch, page, limit, debouncedSearch, status, appointmentDate]);

  /* ----------------------------------------------------
   * Refresh
   * --------------------------------------------------*/

  const reloadAppointments = () => {
    dispatch(
      fetchAppointments({
        page,
        limit,
        keyword: debouncedSearch,
        status,
        appointmentDate,
      }),
    );
  };
  /* ----------------------------------------------------
   * View Appointment
   * --------------------------------------------------*/

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    setShowViewModal(true);
  };

  /* ----------------------------------------------------
   * Update Status
   * --------------------------------------------------*/

  const handleStatus = (appointment) => {
    setSelectedAppointment(appointment);
    setShowStatusModal(true);
  };

  const handleStatusSubmit = async (status) => {
    if (!selectedAppointment) return;

    await dispatch(updateAppointmentStatus(selectedAppointment._id, status));

    setShowStatusModal(false);
    setSelectedAppointment(null);

    reloadAppointments();
  };

  /* ----------------------------------------------------
   * Admin Remarks
   * --------------------------------------------------*/

  const handleRemarks = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRemarksModal(true);
  };

  const handleRemarksSubmit = async (remarks) => {
    if (!selectedAppointment) return;

    await dispatch(saveAppointmentRemarks(selectedAppointment._id, remarks));

    setShowRemarksModal(false);
    setSelectedAppointment(null);

    reloadAppointments();
  };

  /* ----------------------------------------------------
   * Delete Appointment
   * --------------------------------------------------*/

  const handleDelete = async (appointment) => {
    if (!appointment) return;

    await dispatch(deleteAppointment(appointment._id));

    reloadAppointments();
  };

  /* ----------------------------------------------------
   * Refresh
   * --------------------------------------------------*/

  const handleRefresh = () => {
    reloadAppointments();
  };

  /* ----------------------------------------------------
   * Close All Modals
   * --------------------------------------------------*/

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedAppointment(null);
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    setSelectedAppointment(null);
  };

  const closeRemarksModal = () => {
    setShowRemarksModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="container-fluid">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">Appointment Management</h3>

          <p className="text-muted mb-0">Manage all patient appointments</p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRefresh}
          disabled={loading}
        >
          <i className="pi pi-refresh me-2"></i>
          Refresh
        </button>
      </div>

      {/* Error */}

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Filters */}

      <AppointmentFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        appointmentDate={appointmentDate}
        setAppointmentDate={setAppointmentDate}
        limit={limit}
        setLimit={setLimit}
      />

      {/* Table */}

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <AppointmentTable
            loading={loading}
            appointments={appointments}
            page={page}
            limit={limit}
            onView={handleView}
            onStatus={handleStatus}
            onRemarks={handleRemarks}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* View Modal */}

      <AppointmentViewModal
        show={showViewModal}
        appointment={selectedAppointment}
        onClose={closeViewModal}
      />

      {/* Status Modal */}

      <AppointmentStatusModal
        show={showStatusModal}
        appointment={selectedAppointment}
        loading={loading}
        onClose={closeStatusModal}
        onSubmit={handleStatusSubmit}
      />

      {/* Remarks Modal */}

      <AppointmentRemarksModal
        show={showRemarksModal}
        appointment={selectedAppointment}
        loading={loading}
        onClose={closeRemarksModal}
        onSubmit={handleRemarksSubmit}
      />
      {/* Pagination */}

      {pagination?.totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="text-muted">
            Showing Page <strong>{page}</strong> of{" "}
            <strong>{pagination.totalPages}</strong>
            {pagination.total > 0 && (
              <>
                {" "}
                | Total Records : <strong>{pagination.total}</strong>
              </>
            )}
          </div>

          <nav>
            <ul className="pagination mb-0">
              {/* Previous */}

              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Previous
                </button>
              </li>

              {/* Page Numbers */}

              {Array.from({ length: pagination.totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${page === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              {/* Next */}

              <li
                className={`page-item ${
                  page === pagination.totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AppointmentListPage;
