const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

exports.getProfile = asyncHandler(async (req, res) => {
  return res.json(
    new ApiResponse(
      200,

      "Profile fetched successfully",

      req.user,
    ),
  );
});
