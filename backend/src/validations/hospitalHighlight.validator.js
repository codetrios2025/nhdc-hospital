const { body } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Create Validation
|--------------------------------------------------------------------------
*/

const createHospitalHighlightValidation = [
  body("value")
    .trim()
    .notEmpty()
    .withMessage("Value is required.")
    .isLength({ max: 50 })
    .withMessage("Value cannot exceed 50 characters."),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters."),

  body("icon")
    .trim()
    .notEmpty()
    .withMessage("Icon is required.")
    .isLength({ max: 100 })
    .withMessage("Icon cannot exceed 100 characters."),

  body("order")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Order must be greater than 0."),

  body("isActive").optional().isBoolean().withMessage("Invalid status."),
];

/*
|--------------------------------------------------------------------------
| Update Validation
|--------------------------------------------------------------------------
*/

const updateHospitalHighlightValidation = [
  body("value")
    .trim()
    .notEmpty()
    .withMessage("Value is required.")
    .isLength({ max: 50 })
    .withMessage("Value cannot exceed 50 characters."),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters."),

  body("icon")
    .trim()
    .notEmpty()
    .withMessage("Icon is required.")
    .isLength({ max: 100 })
    .withMessage("Icon cannot exceed 100 characters."),

  body("order")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Order must be greater than 0."),

  body("isActive").optional().isBoolean().withMessage("Invalid status."),
];

module.exports = {
  createHospitalHighlightValidation,
  updateHospitalHighlightValidation,
};
