import { useForm } from "react-hook-form";
import diagnosticInitialValues from "../constants/diagnosticInitialValues";

const useDiagnosticForm = () => {
  return useForm({
    defaultValues: diagnosticInitialValues,
  });
};

export default useDiagnosticForm;
