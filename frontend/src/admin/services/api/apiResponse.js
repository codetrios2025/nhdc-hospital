export const successResponse = (response) => {
  return {
    success: true,

    data: response.data,

    message: response.message,
  };
};

export const errorResponse = (error) => {
  return {
    success: false,

    message:
      error.response?.data?.message || error.message || "Something went wrong.",
  };
};
