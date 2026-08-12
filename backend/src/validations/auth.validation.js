const { body, param } = require("express-validator");

/**
 * =====================================================
 * LOGIN VALIDATION
 * =====================================================
 */
exports.loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),

  body("password").notEmpty().withMessage("Password is required"),
];

/**
 * =====================================================
 * FORGOT PASSWORD VALIDATION
 * =====================================================
 */
exports.forgotPasswordValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
];

/**
 * =====================================================
 * RESET PASSWORD VALIDATION
 * =====================================================
 */
exports.resetPasswordValidation = [
  param("token").trim().notEmpty().withMessage("Reset token is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")

    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")

    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")

    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")

    .matches(/\d/)
    .withMessage("Password must contain at least one number")

    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),
];

/**
 * =====================================================
 * CHANGE PASSWORD VALIDATION
 * =====================================================
 */
exports.changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")

    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters")

    .matches(/[a-z]/)
    .withMessage("New password must contain at least one lowercase letter")

    .matches(/[A-Z]/)
    .withMessage("New password must contain at least one uppercase letter")

    .matches(/\d/)
    .withMessage("New password must contain at least one number")

    .matches(/[@$!%*?&]/)
    .withMessage("New password must contain at least one special character"),
];
