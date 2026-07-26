import AppointmentStatusBadge from "./AppointmentStatusBadge";
import AppointmentActionMenu from "./AppointmentActionMenu";

const AppointmentTable = ({ appointments = [], loading }) => {
  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (!appointments.length) {
    return <div className="alert alert-warning">No appointments found.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <th>Patient</th>

            <th>Mobile</th>

            <th>Department</th>

            <th>Doctor</th>

            <th>Date</th>

            <th>Status</th>

            <th width="80">Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((item) => (
            <tr key={item._id}>
              <td>{item.patientName}</td>

              <td>{item.mobile}</td>

              <td>{item.department?.name}</td>

              <td>{item.doctor?.name}</td>

              <td>
                {" "}
                {new Date(item.appointmentDate).toLocaleDateString("en-GB")}
              </td>

              <td>
                <AppointmentStatusBadge status={item.status} />
              </td>

              <td>
                <AppointmentActionMenu
                  appointment={item}
                  onView={() => {}}
                  onStatus={() => {}}
                  onDelete={() => {}}
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
