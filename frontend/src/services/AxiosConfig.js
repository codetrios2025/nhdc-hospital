import axios from "axios";
import constants from "./constants";

const axiosService = axios.create({
  baseURL: constants.API_BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosService;
