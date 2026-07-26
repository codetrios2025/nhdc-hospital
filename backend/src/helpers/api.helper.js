const ApiResponse = require("../utils/ApiResponse");

exports.success = (
  res,

  message,

  data = null,

  meta = null,

  status = 200,
) => {
  return res.status(status).json(
    new ApiResponse(
      status,

      true,

      message,

      data,

      meta,
    ),
  );
};

exports.error = (
  res,

  message,

  status = 500,
) => {
  return res.status(status).json(
    new ApiResponse(
      status,

      false,

      message,
    ),
  );
};
