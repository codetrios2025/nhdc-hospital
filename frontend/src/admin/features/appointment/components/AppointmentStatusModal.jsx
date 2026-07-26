import { useState } from "react";

const AppointmentStatusModal = ({ show, onClose, onSubmit }) => {
  const [status, setStatus] = useState("Confirmed");

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Update Status</h5>

            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>New</option>
              <option>Confirmed</option>
              <option>Visited</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={() => onSubmit(status)}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentStatusModal;
