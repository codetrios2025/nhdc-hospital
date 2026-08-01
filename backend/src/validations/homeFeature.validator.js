const { body } = require("express-validator");

exports.createValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 100 })
    .withMessage("Title must not exceed 100 characters."),

  body("subtitle")
    .trim()
    .notEmpty()
    .withMessage("Subtitle is required.")
    .isLength({ max: 150 })
    .withMessage("Subtitle must not exceed 150 characters."),

  body("icon").trim().notEmpty().withMessage("Icon is required."),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a positive number."),

  body("status").optional().isBoolean().withMessage("Invalid status."),
];

exports.updateValidation = exports.createValidation;
