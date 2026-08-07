import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import useHospitalHighlightForm from "../hooks/useHospitalHighlightForm";

import HospitalHighlightBasicInfo from "./HospitalHighlightBasicInfo";
import HospitalHighlightSettings from "./HospitalHighlightSettings";

import {
  createHospitalHighlight,
  updateHospitalHighlight,
  fetchHospitalHighlightById,
} from "../../../redux/thunks/hospitalHighlightThunk";

const HospitalHighlightForm = ({ hospitalHighlightId = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useHospitalHighlightForm();

  const { loading, hospitalHighlight } = useSelector(
    (state) => state.hospitalHighlights,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  /*
  --------------------------------------------------
  Load Data (Edit)
  --------------------------------------------------
  */

  useEffect(() => {
    if (hospitalHighlightId) {
      dispatch(fetchHospitalHighlightById(hospitalHighlightId));
    }
  }, [dispatch, hospitalHighlightId]);

  /*
  --------------------------------------------------
  Reset Form
  --------------------------------------------------
  */

  useEffect(() => {
    if (!hospitalHighlightId || !hospitalHighlight) return;

    reset({
      value: hospitalHighlight.value || "",
      title: hospitalHighlight.title || "",
      description: hospitalHighlight.description || "",
      icon: hospitalHighlight.icon || "",
      order: hospitalHighlight.order || 1,
      isActive: hospitalHighlight.isActive ?? true,
    });
  }, [hospitalHighlightId, hospitalHighlight, reset]);

  /*
  --------------------------------------------------
  Submit
  --------------------------------------------------
  */

  const onSubmit = async (data) => {
    try {
      // Send JSON instead of FormData
      const payload = {
        value: data.value,
        title: data.title,
        description: data.description,
        icon: data.icon,
        order: Number(data.order),
        isActive: data.isActive,
      };

      let response;

      if (hospitalHighlightId) {
        response = await dispatch(
          updateHospitalHighlight({
            id: hospitalHighlightId,
            data: payload,
          }),
        );

        if (updateHospitalHighlight.fulfilled.match(response)) {
          Swal.fire({
            icon: "success",
            title: "Updated",
            text: "Hospital Highlight updated successfully.",
          });

          navigate("/admin/hospital-highlights");
        } else {
          throw new Error(
            response.payload?.message || "Unable to update Hospital Highlight.",
          );
        }
      } else {
        response = await dispatch(createHospitalHighlight(payload));
        console.log("FULL RESPONSE:", response);
        console.log("PAYLOAD:", response.payload);

        if (createHospitalHighlight.fulfilled.match(response)) {
          console.log("Create Response:", response);

          Swal.fire({
            icon: "success",
            title: "Created",
            text: "Hospital Highlight created successfully.",
          });

          Swal.fire({
            icon: "success",
            title: "Created",
            text: "Hospital Highlight created successfully.",
          }).then(() => {
            navigate("/admin/hospital-highlights");
          });
        } else {
          throw new Error(
            response.payload?.message || "Unable to create Hospital Highlight.",
          );
        }
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.message ||
          error?.response?.data?.message ||
          "Something went wrong.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-8">
          <HospitalHighlightBasicInfo register={register} errors={errors} />
        </div>

        <div className="col-lg-4">
          <HospitalHighlightSettings register={register} errors={errors} />
        </div>
      </div>

      <div className="text-end mt-4">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? hospitalHighlightId
              ? "Updating..."
              : "Saving..."
            : hospitalHighlightId
              ? "Update Hospital Highlight"
              : "Save Hospital Highlight"}
        </button>
      </div>
    </form>
  );
};

export default HospitalHighlightForm;
