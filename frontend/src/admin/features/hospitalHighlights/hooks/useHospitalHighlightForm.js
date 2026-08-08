import { useForm } from "react-hook-form";

import defaultHospitalHighlightValues from "../utils/defaultHospitalHighlightValues";

const useHospitalHighlightForm = () => {
  return useForm({
    mode: "onBlur",
    defaultValues: defaultHospitalHighlightValues,
  });
};

export default useHospitalHighlightForm;
