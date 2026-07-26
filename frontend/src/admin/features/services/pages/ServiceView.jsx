import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchService } from "../../../redux/thunks/serviceThunk";

const ServiceView = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { service } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchService(id));
  }, [dispatch, id]);

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img
                src={service.imageUrl || "/default-service.webp"}
                className="img-fluid rounded"
                alt={service.title}
              />
            </div>

            <div className="col-md-8">
              <h2>{service.title}</h2>

              <p>{service.shortDescription}</p>

              <div
                dangerouslySetInnerHTML={{
                  __html: service.description,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceView;
