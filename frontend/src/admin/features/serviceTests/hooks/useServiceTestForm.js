import { useForm } from "react-hook-form";

import defaultServiceTestValues from "../utils/defaultServiceTestValues";

const useServiceTestForm = () => {
  return useForm({
    defaultValues: defaultServiceTestValues,
    mode: "onChange",
  });
};

export default useServiceTestForm;
