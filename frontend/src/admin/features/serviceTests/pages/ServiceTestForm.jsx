import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";

import useServiceTestForm from "../hooks/useServiceTestForm";

import ServiceTestBasicInfo from "../components/ServiceTestBasicInfo";
import ServiceTestImage from "../components/ServiceTestImage";

import createServiceTestFormData from "../utils/createServiceTestFormData";
import updateServiceTestFormData from "../utils/updateServiceTestFormData";
import defaultServiceTestValues from "../utils/defaultServiceTestValues";

import {
  createServiceTest,
  updateServiceTest,
} from "../../../redux/thunks/serviceTestThunk";

const ServiceTestForm = ({ serviceId, editTest, onSaved }) => {
  const dispatch = useDispatch();

  const { submitting } = useSelector((state) => state.serviceTests);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useServiceTestForm();

  /*
  |--------------------------------------------------------------------------
  | Fill Form (Create / Edit)
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!serviceId) return;

    if (!editTest) {
      reset(defaultServiceTestValues);

      setValue("service", serviceId);

      return;
    }

    reset({
      service: serviceId,

      testName: editTest.testName || "",

      subtitle: editTest.subtitle || "",

      description: editTest.description || "",

      imageAlt: editTest.imageAlt || "",

      displayOrder: editTest.displayOrder || 1,

      status: editTest.status ?? true,

      image: editTest.image
        ? {
            imageUrl: editTest.imageUrl,
          }
        : null,
    });
  }, [editTest, serviceId, reset, setValue]);

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const onSubmit = async (values) => {
    try {
      values.service = serviceId;

      if (editTest) {
        await dispatch(
          updateServiceTest({
            id: editTest._id,
            data: updateServiceTestFormData(values),
          }),
        ).unwrap();

        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Service Test updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await dispatch(
          createServiceTest(createServiceTestFormData(values)),
        ).unwrap();

        Swal.fire({
          icon: "success",
          title: "Created",
          text: "Service Test created successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      reset(defaultServiceTestValues);

      setValue("service", serviceId);

      onSaved?.();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error || "Unable to save service test.",
      });
    }
  };

  return (
    <div className="card border mt-3">
      <div className="card-body">
        <ServiceTestBasicInfo register={register} errors={errors} />

        <ServiceTestImage
          register={register}
          watch={watch}
          setValue={setValue}
        />

        <div className="text-end mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit(onSubmit)}
          >
            {submitting
              ? editTest
                ? "Updating..."
                : "Saving..."
              : editTest
                ? "Update Test"
                : "Save Test"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceTestForm;
