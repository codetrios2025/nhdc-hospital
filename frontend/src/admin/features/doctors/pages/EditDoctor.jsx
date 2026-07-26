import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import DoctorForm from "../components/DoctorForm";
import { fetchDoctor } from "../../../redux/thunks/doctorThunk";

const EditDoctor = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctor(id));
  }, [dispatch, id]);

  return (
    <div className="container-fluid">
      <div className="page-header mb-4">
        <h2>Edit Doctor</h2>

        <p className="text-muted">Update doctor information.</p>
      </div>

      <DoctorForm doctorId={id} />
    </div>
  );
};

export default EditDoctor;
