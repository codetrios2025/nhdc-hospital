const DoctorDetailsCard = ({ doctor }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-md-3 text-center">
            <img
              src={doctor.profileImageUrl || "/default-doctor.png"}
              className="img-fluid rounded"
              alt=""
            />
          </div>

          <div className="col-md-9">
            <table className="table">
              <tbody>
                <tr>
                  <th>Name</th>

                  <td>{doctor.fullName}</td>
                </tr>

                <tr>
                  <th>Department</th>

                  <td>{doctor.department}</td>
                </tr>

                <tr>
                  <th>Designation</th>

                  <td>{doctor.designation}</td>
                </tr>

                <tr>
                  <th>Qualification</th>

                  <td>{doctor.qualification}</td>
                </tr>

                <tr>
                  <th>Experience</th>

                  <td>{doctor.experience} Years</td>
                </tr>

                <tr>
                  <th>Description</th>

                  <td
                    dangerouslySetInnerHTML={{
                      __html: doctor.description || "",
                    }}
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsCard;
