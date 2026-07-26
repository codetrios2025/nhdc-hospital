export const successResponse = (response) => {
  return {
    success: true,

    message: response.data.message,

    data: response.data.data,

    meta: response.data.meta || null,
  };
};

export const errorResponse = (error) => {
  return {
    success: false,

    message:
      error.response?.data?.message || error.message || "Unexpected error",
  };
};
