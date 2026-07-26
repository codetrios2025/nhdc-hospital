import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchDoctor } from "../../../redux/thunks/doctorThunk";

import DoctorDetailsCard from "../components/DoctorDetailsCard";

const DoctorView = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { doctor, loading } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(fetchDoctor(id));
  }, [dispatch, id]);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  if (!doctor)
    return <div className="alert alert-danger">Doctor not found</div>;

  return (
    <div className="container-fluid">
      {/* <div className="mb-4">
        <h2>Doctor Details</h2>

        <p className="text-muted">View doctor information</p>
      </div> */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Doctor Details</h2>

          <p className="text-muted">View doctor information</p>
        </div>

        <Link to="/doctors" className="btn btn-secondary">
          <i className="bi bi-arrow-left"></i>
          Back
        </Link>
      </div>

      <DoctorDetailsCard doctor={doctor} />
    </div>
  );
};

export default DoctorView;
