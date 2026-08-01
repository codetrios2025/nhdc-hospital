import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import useDiagnosticForm from "../hooks/useDiagnosticForm";

import DiagnosticBasicInfo from "../components/DiagnosticBasicInfo";
import DiagnosticSettings from "../components/DiagnosticSettings";

import createDiagnosticFormData from "../utils/createDiagnosticFormData";

import {
  createDiagnostic,
  updateDiagnosticData,
  fetchDiagnostic,
} from "../../../redux/thunks/diagnosticThunk";

import { clearDiagnostic } from "../../../redux/slices/diagnosticSlice";

const DiagnosticForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const diagnosticId = id;

  const { loading, diagnostic } = useSelector((state) => state.diagnostic);

  const methods = useDiagnosticForm();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  /*
  |--------------------------------------------------------------------------
  | Load Diagnostic (Edit Mode)
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (diagnosticId) {
      dispatch(fetchDiagnostic(diagnosticId));
    }

    return () => {
      dispatch(clearDiagnostic());
    };
  }, [dispatch, diagnosticId]);

  /*
  |--------------------------------------------------------------------------
  | Populate Form
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!diagnosticId || !diagnostic) return;

    reset({
      title: diagnostic.title || "",
      shortDescription: diagnostic.shortDescription || "",
      icon: diagnostic.icon || "",
      iconColor: diagnostic.iconColor || "",
      link: diagnostic.link || "",
      displayOrder: diagnostic.displayOrder || 0,
      status: diagnostic.status ?? true,
    });
  }, [diagnosticId, diagnostic, reset]);

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const onSubmit = async (values) => {
    try {
      const payload = createDiagnosticFormData(values);

      if (diagnosticId) {
        await dispatch(updateDiagnosticData(diagnosticId, payload));

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Diagnostic Service updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await dispatch(createDiagnostic(payload));

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Diagnostic Service created successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        reset();
      }

      navigate("/admin/diagnostic-services");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to save Diagnostic Service.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-8">
          <DiagnosticBasicInfo register={register} errors={errors} />
        </div>

        <div className="col-lg-4">
          <DiagnosticSettings register={register} />
        </div>
      </div>

      <div className="text-end mt-4">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? diagnosticId
              ? "Updating..."
              : "Saving..."
            : diagnosticId
              ? "Update Diagnostic Service"
              : "Save Diagnostic Service"}
        </button>
      </div>
    </form>
  );
};

export default DiagnosticForm;
