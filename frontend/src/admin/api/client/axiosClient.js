import axios from "axios";

import {
  requestInterceptor,
  requestErrorInterceptor,
  responseInterceptor,
  responseErrorInterceptor,
} from "./interceptors";

// const axiosClient = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,

//   timeout: 30000,

//   headers: {
//     "Content-Type": "application/json",
//   },
// });
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
});

axiosClient.interceptors.request.use(
  requestInterceptor,

  requestErrorInterceptor,
);

axiosClient.interceptors.response.use(
  responseInterceptor,

  responseErrorInterceptor,
);

export default axiosClient;
