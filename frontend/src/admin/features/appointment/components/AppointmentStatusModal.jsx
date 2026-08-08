import { useEffect, useState } from "react";

const STATUS_OPTIONS = [
  {
    label: "New",
    value: "New",
  },
  {
    label: "Confirmed",
    value: "Confirmed",
  },
  {
    label: "Visited",
    value: "Visited",
  },
  {
    label: "Cancelled",
    value: "Cancelled",
  },
];

const AppointmentStatusModal = ({
  show,
  appointment,
  loading = false,
  onClose,
  onSubmit,
}) => {
  const [status, setStatus] = useState("New");
  const [appointmentTime, setAppointmentTime] = useState(
    appointment?.appointmentTime || "",
  );

  useEffect(() => {
    if (appointment?.status) {
      setStatus(appointment.status);
    }
  }, [appointment]);

  useEffect(() => {
    if (appointment) {
      setStatus(appointment.status || "New");
      setAppointmentTime(appointment.appointmentTime || "");
    }
  }, [appointment]);

  if (!show) return null;

  const handleSubmit = () => {
    if (status === "Confirmed" && !appointmentTime) {
      return Swal.fire({
        icon: "warning",
        title: "Validation",
        text: "Please select appointment time.",
      });
    }

    onSubmit(status, appointmentTime);
  };

  return (
    <div
      className="modal fade show d-block"
      style={{
        background: "rgba(0,0,0,.5)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Appointment Status</h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            />
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label fw-semibold">Patient</label>

              <input
                type="text"
                className="form-control"
                value={appointment?.patientName || ""}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Appointment Date</label>

              <input
                type="text"
                className="form-control"
                value={
                  appointment?.appointmentDate
                    ? new Date(appointment.appointmentDate).toLocaleDateString(
                        "en-GB",
                      )
                    : "-"
                }
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Status</label>

              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={loading}
              >
                {STATUS_OPTIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Appointment Time</label>

              <input
                type="time"
                className="form-control"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Updating...
                </>
              ) : (
                <>
                  <i className="pi pi-check me-2"></i>
                  Update Status
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentStatusModal;
