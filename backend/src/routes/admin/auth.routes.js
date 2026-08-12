const express = require("express");

const router = express.Router();

const AuthController = require("../../controllers/auth.controller");

const verifyToken = require("../../middlewares/verifyToken");

const { loginValidation } = require("../../validations/auth.validation");

const {
  forgotPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
} = require("../../validations/auth.validation");

router.post("/login", loginValidation, AuthController.login);

// NEW
router.get("/profile", verifyToken, AuthController.profile);

// NEW
router.post("/logout", verifyToken, AuthController.logout);

/**
 * =====================================================
 * FORGOT PASSWORD
 * =====================================================
 */
router.post(
  "/forgot-password",
  forgotPasswordValidation,
  AuthController.forgotPassword,
);

/**
 * =====================================================
 * RESET PASSWORD
 * =====================================================
 */
router.post(
  "/reset-password/:token",
  resetPasswordValidation,
  AuthController.resetPassword,
);

/**
 * =====================================================
 * CHANGE PASSWORD
 * =====================================================
 */
router.post(
  "/change-password",
  verifyToken,
  changePasswordValidation,
  AuthController.changePassword,
);

module.exports = router;
