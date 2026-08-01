import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";

import HomeFeatureForm from "./HomeFeatureForm";

import { fetchHomeFeature } from "../../../redux/thunks/homeFeatureThunk";

const EditHomeFeature = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeFeature(id));
  }, [dispatch, id]);

  return <HomeFeatureForm homeFeatureId={id} />;
};

export default EditHomeFeature;
