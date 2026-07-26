import { useState } from "react";

const AppointmentRemarksModal = ({ show, onClose, onSubmit }) => {
  const [remarks, setRemarks] = useState("");

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Admin Remarks</h5>

            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <textarea
              rows={5}
              className="form-control"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-primary"
              onClick={() => onSubmit(remarks)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentRemarksModal;
