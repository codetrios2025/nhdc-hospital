const apiErrorHandler = (error) => {
  if (!error.response) {
    return {
      message: "Network Error",
    };
  }

  switch (error.response.status) {
    case 400:
      return {
        message: error.response.data.message,
      };

    case 401:
      return {
        message: "Unauthorized",
      };

    case 403:
      return {
        message: "Access Denied",
      };

    case 404:
      return {
        message: "Resource Not Found",
      };

    case 500:
      return {
        message: "Internal Server Error",
      };

    default:
      return {
        message: error.message,
      };
  }
};

export default apiErrorHandler;
