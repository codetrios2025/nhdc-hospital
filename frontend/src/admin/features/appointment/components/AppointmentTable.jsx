import AppointmentStatusBadge from "./AppointmentStatusBadge";
import AppointmentActionMenu from "./AppointmentActionMenu";

const AppointmentTable = ({
  appointments = [],
  loading = false,
  page = 1,
  limit = 10,
  onView,
  onStatus,
  onRemarks,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <div className="mt-3">Loading appointments...</div>
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className="alert alert-warning text-center mb-0">
        <i className="pi pi-info-circle me-2"></i>
        No appointments found.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th width="60">#</th>

            <th>Patient</th>

            <th>Mobile</th>

            {/* <th>Department</th>

            <th>Doctor</th> */}
            <th>Email</th>
            <th>Preferred Date</th>

            <th width="130">Appointment Date</th>

            <th>Time</th>

            <th width="120">Status</th>

            <th width="130">Created</th>

            <th width="90" className="text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((item, index) => (
            <tr key={item._id}>
              <td>{(page - 1) * limit + index + 1}</td>

              <td>
                <div className="fw-semibold">{item.patientName}</div>

                <small className="text-muted">
                  {item.gender} | {item.age} Years
                </small>
              </td>

              <td>{item.mobile}</td>

              {/* <td>{item.department?.name || "-"}</td>

              <td>{item.doctor?.name || "-"}</td> */}
              <td>{item.email || "-"}</td>

              <td>
                {item.preferredDate
                  ? new Date(item.preferredDate).toLocaleDateString("en-GB")
                  : item.appointmentDate
                    ? new Date(item.appointmentDate).toLocaleDateString("en-GB")
                    : "-"}
              </td>

              <td>
                {item.appointmentDate
                  ? new Date(item.appointmentDate).toLocaleDateString("en-GB")
                  : "-"}
              </td>
              <td>{item.appointmentTime || "-"}</td>
              <td>
                <AppointmentStatusBadge status={item.status} />
              </td>

              <td>
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-GB")
                  : "-"}
              </td>

              <td className="text-center">
                <AppointmentActionMenu
                  appointment={item}
                  onView={onView}
                  onStatus={onStatus}
                  onRemarks={onRemarks}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
