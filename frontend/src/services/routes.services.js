import axiosService from "./AxiosConfig";

//Home API
//Home Banner APO
export const getBannerData = () => {
  return axiosService.get("banner");
};
// Home features API
export const getFeaturesData = () => {
  return axiosService.get("home-features");
};
//Home Advanced API
export const getDiagnosticServicesData = () => {
  return axiosService.get("diagnostic-services");
};
// Home Services API
export const getHomeServices = () => {
  return axiosService.get("services/home");
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

export const getServiceBySlug = (slug) => {
  return axiosService.get(`services/${slug}`);
};

export const postBooking = (data) => {
  return axiosService.post("appointments", data);
};

export const getContactData = () => {
  return axiosService.get("contact");
};
