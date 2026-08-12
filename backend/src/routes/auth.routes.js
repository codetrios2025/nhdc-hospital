const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/auth.controller");

const verifyToken = require("../middlewares/verifyToken");

const {
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
} = require("../validations/auth.validation");

router.post(
  "/login",

  loginValidation,

  AuthController.login,
);

router.post(
  "/forgot-password",
  forgotPasswordValidation,
  AuthController.forgotPassword,
);

router.post(
  "/reset-password/:token",
  resetPasswordValidation,
  AuthController.resetPassword,
);

router.post(
  "/change-password",
  verifyToken,
  changePasswordValidation,
  AuthController.changePassword,
);

module.exports = router;
