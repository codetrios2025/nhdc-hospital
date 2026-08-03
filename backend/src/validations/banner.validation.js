const { body } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Common Validation
|--------------------------------------------------------------------------
*/

const commonValidation = [
  /*
  |--------------------------------------------------------------------------
  | Banner Information
  |--------------------------------------------------------------------------
  */

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
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 150 })
    .withMessage("Alt text cannot exceed 150 characters."),

  /*
  |--------------------------------------------------------------------------
  | Buttons
  |--------------------------------------------------------------------------
  */

  body("primaryButtonText")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage("Primary button text cannot exceed 50 characters."),

  body("primaryButtonLink")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Primary button link cannot exceed 500 characters."),

  body("secondaryButtonText")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage("Secondary button text cannot exceed 50 characters."),

  body("secondaryButtonLink")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Secondary button link cannot exceed 500 characters."),

  /*
  |--------------------------------------------------------------------------
  | Slides
  |--------------------------------------------------------------------------
  */

  body("slides")
    .notEmpty()
    .withMessage("At least one banner slide is required.")
    .custom((value) => {
      try {
        const slides = typeof value === "string" ? JSON.parse(value) : value;

        if (!Array.isArray(slides)) {
          throw new Error();
        }

        if (!slides.length) {
          throw new Error();
        }

        return true;
      } catch {
        throw new Error("Invalid banner slides.");
      }
    }),

  /*
  |--------------------------------------------------------------------------
  | Features
  |--------------------------------------------------------------------------
  */

  body("features")
    .optional()
    .custom((value) => {
      if (!value) return true;

      try {
        const features = typeof value === "string" ? JSON.parse(value) : value;

        if (!Array.isArray(features)) {
          throw new Error();
        }

        return true;
      } catch {
        throw new Error("Invalid banner features.");
      }
    }),

  /*
  |--------------------------------------------------------------------------
  | Settings
  |--------------------------------------------------------------------------
  */

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

      throw new Error("Invalid status.");
    }),
];

/*
|--------------------------------------------------------------------------
| Create Validation
|--------------------------------------------------------------------------
*/

const createBannerValidation = [...commonValidation];

/*
|--------------------------------------------------------------------------
| Update Validation
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
    .optional({ checkFalsy: true })
    .trim()
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
    .isLength({ max: 500 })
    .withMessage("Primary button link cannot exceed 500 characters."),

  body("secondaryButtonText")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage("Secondary button text cannot exceed 50 characters."),

  body("secondaryButtonLink")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Secondary button link cannot exceed 500 characters."),

  body("slides")
    .optional()
    .custom((value) => {
      if (!value) return true;

      try {
        const slides = typeof value === "string" ? JSON.parse(value) : value;

        if (!Array.isArray(slides)) {
          throw new Error();
        }

        return true;
      } catch {
        throw new Error("Invalid banner slides.");
      }
    }),

  body("features")
    .optional()
    .custom((value) => {
      if (!value) return true;

      try {
        const features = typeof value === "string" ? JSON.parse(value) : value;

        if (!Array.isArray(features)) {
          throw new Error();
        }

        return true;
      } catch {
        throw new Error("Invalid banner features.");
      }
    }),

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

      throw new Error("Invalid status.");
    }),
];

module.exports = {
  createBannerValidation,
  updateBannerValidation,
};
