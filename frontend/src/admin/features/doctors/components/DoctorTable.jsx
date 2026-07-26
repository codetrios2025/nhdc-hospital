import { Link } from "react-router-dom";

import { DataTable } from "../../../components/common/DataTable";
import DoctorStatusSwitch from "./DoctorStatusSwitch";
import DoctorFeaturedSwitch from "./DoctorFeaturedSwitch";
import DoctorActionButtons from "./DoctorActionButtons";

const DoctorTable = ({
  doctors = [],
  loading = false,
  reloadDoctors,
  deleteDoctor,
}) => {
  const columns = [
    {
      key: "image",
      label: "Image",
    },
    {
      key: "name",
      label: "Doctor Name",
    },
    {
      key: "department",
      label: "Department",
    },
    {
      key: "designation",
      label: "Designation",
    },
    {
      key: "experience",
      label: "Experience",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "action",
      label: "Action",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={doctors}
      loading={loading}
      emptyMessage="No doctors found."
      renderRow={(doctor) => (
        <tr key={doctor._id}>
          <td width="80">
            <img
              src={doctor.profileImageUrl || "/default-doctor.png"}
              alt={`${doctor.firstName} ${doctor.lastName}`}
              className="rounded-circle border"
              width="60"
              height="60"
              style={{
                objectFit: "cover",
              }}
            />
          </td>

          <td>
            <div className="fw-semibold">
              {doctor.firstName} {doctor.lastName}
            </div>

            <small className="text-muted">{doctor.qualification}</small>
          </td>

          <td>{doctor.department?.name || "-"}</td>

          <td>{doctor.designation}</td>

          <td>{doctor.experience} Years</td>

          {/* <td>
            {doctor.isActive ? (
              <span className="badge bg-success">Active</span>
            ) : (
              <span className="badge bg-danger">Inactive</span>
            )}
          </td> */}
          <td>
            <DoctorStatusSwitch doctor={doctor} onUpdated={reloadDoctors} />
          </td>

          {/* <td>
            <div className="btn-group">
              <Link
                to={`/doctors/${doctor._id}`}
                className="btn btn-sm btn-info"
              >
                <i className="bi bi-eye"></i> View
              </Link>

              <Link
                to={`/doctors/${doctor._id}/edit`}
                className="btn btn-sm btn-warning"
              >
                <i className="bi bi-pencil"></i> Edit
              </Link>
            </div>
          </td> */}
          <td>
            <DoctorActionButtons doctor={doctor} onDelete={deleteDoctor} />
          </td>
        </tr>
      )}
    />
  );
};

export default DoctorTable;
