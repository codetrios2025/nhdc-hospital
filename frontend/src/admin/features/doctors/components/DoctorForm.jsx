import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import useDoctorForm from "../hooks/useDoctorForm";

import DoctorBasicInfo from "./DoctorBasicInfo";
import DoctorProfessionalInfo from "./DoctorProfessionalInfo";
import DoctorProfileImage from "./DoctorProfileImage";
import DoctorGalleryUpload from "./DoctorGalleryUpload";

import {
  createDoctor,
  updateDoctorData,
} from "../../../redux/thunks/doctorThunk";

import createDoctorFormData from "../utils/createDoctorFormData";
import updateDoctorFormData from "../utils/updateDoctorFormData";

const DoctorForm = ({ doctorId = null }) => {
  const methods = useDoctorForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, doctor } = useSelector((state) => state.doctor);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods;

  /*
  ---------------------------------------------------------
  Fill Form (Edit Mode)
  ---------------------------------------------------------
  */

  useEffect(() => {
    if (!doctorId || !doctor) return;

    Object.keys(doctor).forEach((key) => {
      if (key === "_id") return;

      if (key === "__v") return;

      if (key === "profileImage") return;

      if (key === "profileImageUrl") return;

      if (key === "gallery") return;

      if (key === "galleryUrls") return;

      if (key === "createdAt") return;

      if (key === "updatedAt") return;

      setValue(key, doctor[key]);
    });
  }, [doctorId, doctor, setValue]);

  /*
  ---------------------------------------------------------
  Submit
  ---------------------------------------------------------
  */

  const onSubmit = async (data) => {
    try {
      let response;

      if (doctorId) {
        const formData = updateDoctorFormData(data);

        response = await dispatch(updateDoctorData(doctorId, formData));

        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Doctor updated successfully",
        });
      } else {
        // const formData = createDoctorFormData(data);

        // response = await dispatch(
        //   createDoctor(formData)
        // );

        let response;

        if (doctorId) {
          const formData = updateDoctorFormData(data);

          response = await dispatch(updateDoctorData(doctorId, formData));
        } else {
          const formData = createDoctorFormData(data);

          response = await dispatch(createDoctor(formData));
        }

        Swal.fire({
          icon: "success",
          title: "Created",
          text: "Doctor created successfully",
        });
      }

      console.log(response);

      navigate("/doctors");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to save doctor",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-8">
          <DoctorBasicInfo register={register} errors={errors} />

          <DoctorProfessionalInfo
            register={register}
            control={control}
            errors={errors}
          />
        </div>

        <div className="col-lg-4">
          <DoctorProfileImage
            watch={watch}
            setValue={setValue}
            doctor={doctor}
          />

          <DoctorGalleryUpload
            watch={watch}
            setValue={setValue}
            doctor={doctor}
          />
        </div>
      </div>

      <div className="text-end mt-4">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? doctorId
              ? "Updating..."
              : "Saving..."
            : doctorId
              ? "Update Doctor"
              : "Save Doctor"}
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
