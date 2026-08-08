import { useEffect, useState } from "react";

const AppointmentRemarksModal = ({
  show,
  appointment,
  loading = false,
  onClose,
  onSubmit,
}) => {
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (appointment) {
      setRemarks(appointment.remarks || "");
    }
  }, [appointment]);

  if (!show) return null;

  const handleSubmit = () => {
    if (!remarks.trim()) {
      alert("Please enter remarks.");
      return;
    }

    onSubmit(remarks.trim());
  };

  return (
    <div
      className="modal fade show d-block"
      style={{
        background: "rgba(0,0,0,.5)",
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Admin Remarks</h5>

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
              <label className="form-label fw-semibold">Remarks</label>

              <textarea
                rows={6}
                className="form-control"
                placeholder="Enter admin remarks..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                disabled={loading}
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
                  Saving...
                </>
              ) : (
                <>
                  <i className="pi pi-save me-2"></i>
                  Save Remarks
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentRemarksModal;
