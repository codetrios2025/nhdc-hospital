const { validationResult } = require("express-validator");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const AuthService = require("../services/auth.service");

/**
 * =====================================================
 * LOGIN
 * =====================================================
 */
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

/**
 * =====================================================
 * PROFILE
 * =====================================================
 */
exports.profile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(ApiResponse.success("Profile fetched successfully", req.user));
});

/**
 * =====================================================
 * LOGOUT
 * =====================================================
 */
exports.logout = asyncHandler(async (req, res) => {
  return res.status(200).json(ApiResponse.success("Logout successful"));
});

/**
 * =====================================================
 * FORGOT PASSWORD
 * =====================================================
 *
 * POST /api/admin/auth/forgot-password
 *
 * Body:
 * {
 *   "email": "admin@example.com"
 * }
 */
exports.forgotPassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(422, errors.array()[0].msg);
  }

  const { email } = req.body;

  await AuthService.forgotPassword(email);

  /*
   * IMPORTANT:
   *
   * We intentionally don't tell the user
   * whether the email exists.
   *
   * This prevents email/account enumeration.
   */
  return res
    .status(200)
    .json(
      ApiResponse.success(
        "If an account exists with this email, a password reset link has been sent.",
      ),
    );
});

/**
 * =====================================================
 * RESET PASSWORD
 * =====================================================
 *
 * POST /api/admin/auth/reset-password/:token
 *
 * Body:
 * {
 *   "password": "Admin@123"
 * }
 */
exports.resetPassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(422, errors.array()[0].msg);
  }

  const { token } = req.params;
  const { password } = req.body;

  if (!token) {
    throw new ApiError(400, "Reset token is required");
  }

  if (!password) {
    throw new ApiError(400, "New password is required");
  }

  await AuthService.resetPassword(token, password);

  return res
    .status(200)
    .json(ApiResponse.success("Password reset successfully. Please login."));
});

/**
 * =====================================================
 * CHANGE PASSWORD
 * =====================================================
 *
 * POST /api/admin/auth/change-password
 *
 * Requires authentication.
 *
 * Body:
 * {
 *   "currentPassword": "OldPassword@123",
 *   "newPassword": "NewPassword@123"
 * }
 */
exports.changePasswordold = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(422, errors.array()[0].msg);
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current password and new password are required");
  }

  /*
   * verifyToken middleware should populate
   * req.user.
   */
  const adminId = req.user?.id || req.user?._id;

  if (!adminId) {
    throw new ApiError(401, "Unauthorized");
  }

  await AuthService.changePassword(adminId, currentPassword, newPassword);

  return res
    .status(200)
    .json(ApiResponse.success("Password changed successfully"));
});

exports.changePassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(422, errors.array()[0].msg);
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current password and new password are required");
  }

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized");
  }

  await AuthService.changePassword(req.user._id, currentPassword, newPassword);

  return res
    .status(200)
    .json(ApiResponse.success("Password changed successfully"));
});
