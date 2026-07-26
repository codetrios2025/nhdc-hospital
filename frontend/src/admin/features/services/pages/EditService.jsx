import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ServiceForm from "../components/ServiceForm";
import { fetchService } from "../../../redux/thunks/serviceThunk";

const EditService = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchService(id));
  }, [dispatch, id]);

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h3>Edit Service</h3>
      </div>

      <ServiceForm serviceId={id} />
    </div>
  );
};

export default EditService;
