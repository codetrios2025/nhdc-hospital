const { body } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Common Validation Rules
|--------------------------------------------------------------------------
*/

const commonValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Banner title is required.")
    .isLength({ max: 150 })
    .withMessage("Banner title cannot exceed 150 characters."),

  body("subtitle")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 250 })
    .withMessage("Subtitle cannot exceed 250 characters."),

  body("description").optional({ checkFalsy: true }).trim(),

  body("altText")
    .trim()
    .notEmpty()
    .withMessage("Alt text is required.")
    .isLength({ max: 150 })
    .withMessage("Alt text cannot exceed 150 characters."),

  body("primaryButtonText")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage("Primary button text cannot exceed 50 characters."),

  body("primaryButtonLink")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Primary button link must be a valid URL."),

  body("secondaryButtonText")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage("Secondary button text cannot exceed 50 characters."),

  body("secondaryButtonLink")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Secondary button link must be a valid URL."),

  body("displayOrder")
    .notEmpty()
    .withMessage("Display order is required.")
    .isInt({ min: 1 })
    .withMessage("Display order must be greater than 0."),

  body("status")
    .optional()
    .custom((value) => {
      if (
        value === true ||
        value === false ||
        value === "true" ||
        value === "false"
      ) {
        return true;
      }

      throw new Error("Invalid status value.");
    }),
];

/*
|--------------------------------------------------------------------------
| Create Banner Validation
|--------------------------------------------------------------------------
*/

const createBannerValidation = [...commonValidation];

/*
|--------------------------------------------------------------------------
| Update Banner Validation
|--------------------------------------------------------------------------
*/

const updateBannerValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Banner title cannot be empty.")
    .isLength({ max: 150 })
    .withMessage("Banner title cannot exceed 150 characters."),

  body("subtitle")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 250 })
    .withMessage("Subtitle cannot exceed 250 characters."),

  body("description").optional({ checkFalsy: true }).trim(),

  body("altText")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Alt text cannot be empty.")
    .isLength({ max: 150 })
    .withMessage("Alt text cannot exceed 150 characters."),

  body("primaryButtonText")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage("Primary button text cannot exceed 50 characters."),

  body("primaryButtonLink")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Primary button link must be a valid URL."),

  body("secondaryButtonText")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage("Secondary button text cannot exceed 50 characters."),

  body("secondaryButtonLink")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Secondary button link must be a valid URL."),

  body("displayOrder")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Display order must be greater than 0."),

  body("status")
    .optional()
    .custom((value) => {
      if (
        value === true ||
        value === false ||
        value === "true" ||
        value === "false"
      ) {
        return true;
      }

      throw new Error("Invalid status value.");
    }),
];

module.exports = {
  createBannerValidation,
  updateBannerValidation,
};
