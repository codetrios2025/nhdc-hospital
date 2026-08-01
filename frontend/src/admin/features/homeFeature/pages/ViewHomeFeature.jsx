import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchHomeFeature } from "../../../redux/thunks/homeFeatureThunk";

const ViewHomeFeature = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { homeFeature } = useSelector((state) => state.homeFeatures);

  useEffect(() => {
    dispatch(fetchHomeFeature(id));
  }, [dispatch, id]);

  if (!homeFeature) return null;

  return (
    <div className="card">
      <div className="card-body">
        <h3>{homeFeature.title}</h3>

        <p>{homeFeature.subtitle}</p>

        <h5>
          <i className={homeFeature.icon}></i>
        </h5>

        <p>{homeFeature.link}</p>

        <p>Status :{homeFeature.status ? " Active" : " Inactive"}</p>
      </div>
    </div>
  );
};

export default ViewHomeFeature;
