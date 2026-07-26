const { validationResult } = require("express-validator");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const AuthService = require("../services/auth.service");

exports.login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(422, errors.array()[0].msg);
  }

  const data = await AuthService.login(req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, true, "Login successful", data));
});

exports.profile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(ApiResponse.success("Profile fetched successfully", req.user));
});

exports.logout = asyncHandler(async (req, res) => {
  return res.status(200).json(ApiResponse.success("Logout successful"));
});
