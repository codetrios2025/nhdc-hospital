import axiosService from "./AxiosConfig";

export const getallserviceData = () => {
  return axiosService.get("services");
};

export const getDoctorsData = () => {
  return axiosService.get("doctors");
};

export const getVideos = () => {
  return axiosService.get("videos");
};
