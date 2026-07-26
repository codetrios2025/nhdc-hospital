const { body } = require("express-validator");

exports.createServiceValidation = [
  body("title").trim().notEmpty().withMessage("Service title is required"),

  body("department").notEmpty().withMessage("Department is required"),

  body("shortDescription")
    .trim()
    .notEmpty()
    .withMessage("Short description is required")
    .isLength({ max: 300 }),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("displayOrder").optional().isNumeric(),

  body("themeColor").optional(),

  body("showOnHome").optional().isBoolean(),

  body("isFeatured").optional().isBoolean(),

  body("status").optional().isBoolean(),
];

exports.updateServiceValidation = [
  body("title").optional().trim(),

  body("department").optional(),

  body("shortDescription").optional().isLength({ max: 300 }),

  body("description").optional(),
];
