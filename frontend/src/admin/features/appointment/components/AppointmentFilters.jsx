import React from "react";

const AppointmentFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  appointmentDate,
  setAppointmentDate,
  limit,
  setLimit,
}) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row g-3 align-items-end">
          {/* Search */}
          <div className="col-lg-4 col-md-6">
            <label className="form-label fw-semibold">Search</label>

            <input
              type="text"
              className="form-control"
              placeholder="Patient Name / Mobile / Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="col-lg-2 col-md-6">
            <label className="form-label fw-semibold">Status</label>

            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Visited">Visited</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Appointment Date */}
          <div className="col-lg-3 col-md-6">
            <label className="form-label fw-semibold">Appointment Date</label>

            <input
              type="date"
              className="form-control"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>

          {/* Records Per Page */}
          <div className="col-lg-2 col-md-4">
            <label className="form-label fw-semibold">Show</label>

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

          {/* Reset */}
          <div className="col-lg-1 col-md-2">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              title="Reset Filters"
              onClick={() => {
                setSearch("");
                setStatus("");
                setAppointmentDate("");
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

export default AppointmentFilters;
