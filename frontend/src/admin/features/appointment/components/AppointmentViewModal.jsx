import React from "react";

const AppointmentViewModal = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Appointment Details</h5>

            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <strong>Patient</strong>

                <p>{appointment.patientName}</p>
              </div>

              <div className="col-md-6">
                <strong>Mobile</strong>

                <p>{appointment.mobile}</p>
              </div>

              <div className="col-md-6">
                <strong>Email</strong>

                <p>{appointment.email}</p>
              </div>

              <div className="col-md-6">
                <strong>Department</strong>

                <p>{appointment.department?.name}</p>
              </div>

              <div className="col-md-6">
                <strong>Doctor</strong>

                <p>{appointment.doctor?.name}</p>
              </div>

              <div className="col-md-6">
                <strong>Date</strong>

                <p>{appointment.appointmentDate}</p>
              </div>

              <div className="col-md-12">
                <strong>Reason</strong>

                <p>{appointment.reason}</p>
              </div>

              <div className="col-md-12">
                <strong>Remarks</strong>

                <p>{appointment.remarks || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentViewModal;
