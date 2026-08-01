import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import useHomeFeatureForm from "../hooks/useHomeFeatureForm";

import HomeFeatureBasicInfo from "../components/HomeFeatureBasicInfo";
import HomeFeatureSettings from "../components/HomeFeatureSettings";

import {
  createHomeFeature,
  updateHomeFeature,
} from "../../../redux/thunks/homeFeatureThunk";

import createHomeFeatureFormData from "../utils/createHomeFeatureFormData";

const HomeFeatureForm = ({ homeFeatureId = null }) => {
  const methods = useHomeFeatureForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, homeFeature } = useSelector((state) => state.homeFeatures);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  /*
  --------------------------------------------------
  Edit Mode
  --------------------------------------------------
  */

  useEffect(() => {
    if (!homeFeatureId || !homeFeature) return;

    reset({
      title: homeFeature.title || "",

      subtitle: homeFeature.subtitle || "",

      icon: homeFeature.icon || "",

      link: homeFeature.link || "",

      displayOrder: homeFeature.displayOrder || 0,

      status: homeFeature.status ?? true,
    });
  }, [homeFeatureId, homeFeature, reset]);

  /*
  --------------------------------------------------
  Submit
  --------------------------------------------------
  */

  const onSubmit = async (data) => {
    try {
      const payload = createHomeFeatureFormData(data);

      if (homeFeatureId) {
        await dispatch(updateHomeFeature(homeFeatureId, payload));

        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Home Feature updated successfully.",
        });
      } else {
        await dispatch(createHomeFeature(payload));

        Swal.fire({
          icon: "success",
          title: "Created",
          text: "Home Feature created successfully.",
        });
      }

      navigate("/admin/home-features");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to save Home Feature.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-8">
          <HomeFeatureBasicInfo register={register} errors={errors} />
        </div>

        <div className="col-lg-4">
          <HomeFeatureSettings register={register} />
        </div>
      </div>

      <div className="text-end mt-4">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? homeFeatureId
              ? "Updating..."
              : "Saving..."
            : homeFeatureId
              ? "Update Home Feature"
              : "Save Home Feature"}
        </button>
      </div>
    </form>
  );
};

export default HomeFeatureForm;
