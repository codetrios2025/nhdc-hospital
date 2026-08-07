import AppointmentStatusBadge from "./AppointmentStatusBadge";

const AppointmentViewModal = ({ show, appointment, onClose }) => {
  if (!show || !appointment) return null;

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-GB");
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,.5)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Appointment Details</h5>

            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="row">
              {/* Patient Information */}

              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-header fw-bold">Patient Information</div>

                  <div className="card-body">
                    <table className="table table-sm mb-0">
                      <tbody>
                        <tr>
                          <th width="40%">Patient Name</th>
                          <td>{appointment.patientName}</td>
                        </tr>

                        <tr>
                          <th>Age</th>
                          <td>{appointment.age} Years</td>
                        </tr>

                        <tr>
                          <th>Gender</th>
                          <td>{appointment.gender}</td>
                        </tr>

                        <tr>
                          <th>Mobile</th>
                          <td>{appointment.mobile}</td>
                        </tr>

                        <tr>
                          <th>Email</th>
                          <td>{appointment.email || "-"}</td>
                        </tr>

                        <tr>
                          <th>Address</th>
                          <td>{appointment.address || "-"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Appointment Information */}

              <div className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-header fw-bold">
                    Appointment Information
                  </div>

                  <div className="card-body">
                    <table className="table table-sm mb-0">
                      <tbody>
                        <tr>
                          <th width="40%">Department</th>
                          <td>{appointment.department?.name || "-"}</td>
                        </tr>

                        <tr>
                          <th>Doctor</th>
                          <td>{appointment.doctor?.name || "-"}</td>
                        </tr>

                        <tr>
                          <th>Appointment Date</th>
                          <td>{formatDate(appointment.appointmentDate)}</td>
                        </tr>

                        <tr>
                          <th>Status</th>
                          <td>
                            <AppointmentStatusBadge
                              status={appointment.status}
                            />
                          </td>
                        </tr>

                        <tr>
                          <th>Created</th>
                          <td>{formatDateTime(appointment.createdAt)}</td>
                        </tr>

                        <tr>
                          <th>Updated</th>
                          <td>{formatDateTime(appointment.updatedAt)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Reason */}

              <div className="col-md-12 mb-4">
                <div className="card">
                  <div className="card-header fw-bold">Reason / Symptoms</div>

                  <div className="card-body">{appointment.reason || "-"}</div>
                </div>
              </div>

              {/* Admin Remarks */}

              <div className="col-md-12">
                <div className="card">
                  <div className="card-header fw-bold">Admin Remarks</div>

                  <div className="card-body">{appointment.remarks || "-"}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentViewModal;
