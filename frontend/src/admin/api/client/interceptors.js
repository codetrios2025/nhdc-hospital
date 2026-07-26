import storage from "../../utils/storage";

export const requestInterceptor = (config) => {
  const token = storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export const requestErrorInterceptor = (error) => {
  return Promise.reject(error);
};

export const responseInterceptor = (response) => {
  return response;
};

export const responseErrorInterceptor = (error) => {
  if (error.response?.status === 401) {
    storage.removeToken();

    window.location.href = "/login";
  }

  return Promise.reject(error);
};
