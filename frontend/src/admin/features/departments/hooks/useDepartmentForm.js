import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  createDepartment,
  updateDepartment,
} from "../../../redux/thunks/departmentThunk";

import {
  getDepartmentDefaultValues,
  prepareDepartmentPayload,
} from "../utils/departmentFormData";

const useDepartmentForm = ({ department = null, onSuccess }) => {
  const dispatch = useDispatch();

  const { submitting } = useSelector((state) => state.departments);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDepartmentDefaultValues(department),
  });

  useEffect(() => {
    if (department) {
      reset(getDepartmentDefaultValues(department));
    }
  }, [department, reset]);

  const onSubmit = async (values) => {
    try {
      const payload = prepareDepartmentPayload(values);

      if (department?._id) {
        await dispatch(
          updateDepartment({
            id: department._id,
            data: payload,
          }),
        ).unwrap();

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Department updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await dispatch(createDepartment(payload)).unwrap();

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Department created successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error || "Unable to save department.",
      });
    }
  };

  return {
    register,
    control,
    handleSubmit,
    errors,
    submitting,
    onSubmit,
  };
};

export default useDepartmentForm;
