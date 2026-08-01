import { useForm } from "react-hook-form";

import homeFeatureInitialValues from "../constants/homeFeatureInitialValues";

const useHomeFeatureForm = () => {
  return useForm({
    defaultValues: homeFeatureInitialValues,
  });
};

export default useHomeFeatureForm;
