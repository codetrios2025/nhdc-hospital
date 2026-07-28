import axiosService from "./AxiosConfig";

export const getallserviceData = () => {
  return axiosService.get("service");
};
