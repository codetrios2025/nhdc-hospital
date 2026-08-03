import axiosService from "./AxiosConfig";

//Home API
// Home features API
export const getFeaturesData = () => {
  return axiosService.get("home-features");
};
//Home Advanced API
export const getDiagnosticServicesData = () => {
  return axiosService.get("diagnostic-services");
};

// Home Doctors API
export const getDoctorsData = () => {
  return axiosService.get("doctors");
};
//Home Videos API
export const getVideos = () => {
  return axiosService.get("videos");
};

export const getallserviceData = () => {
  return axiosService.get("services");
};




