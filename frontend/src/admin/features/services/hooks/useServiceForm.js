import { useForm } from "react-hook-form";

import serviceInitialValues from "../constants/serviceInitialValues";

const useServiceForm = () => {
  return useForm({
    defaultValues: serviceInitialValues,
  });
};

export default useServiceForm;
