const { body, param, query } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

const createServiceTestValidation = [
  body("service")
    .notEmpty()
    .withMessage("Service is required.")
    .isMongoId()
    .withMessage("Invalid service."),

  body("testName")
    .trim()
    .notEmpty()
    .withMessage("Test name is required.")
    .isLength({ max: 200 })
    .withMessage("Test name cannot exceed 200 characters."),

  body("subtitle")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Subtitle cannot exceed 150 characters."),

  body("description").optional().trim(),

  body("imageAlt")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Image alt cannot exceed 150 characters."),

  body("displayOrder")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Display order must be greater than 0."),

  body("status").optional().isBoolean().withMessage("Invalid status."),
];

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

const updateServiceTestValidation = [
  param("id").isMongoId().withMessage("Invalid service test id."),

  body("service").optional().isMongoId().withMessage("Invalid service."),

  body("testName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Test name cannot be empty.")
    .isLength({ max: 200 })
    .withMessage("Test name cannot exceed 200 characters."),

  body("subtitle")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Subtitle cannot exceed 150 characters."),

  body("description").optional().trim(),

  body("imageAlt")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Image alt cannot exceed 150 characters."),

  body("displayOrder")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Display order must be greater than 0."),

  body("status").optional().isBoolean().withMessage("Invalid status."),
];

/*
|--------------------------------------------------------------------------
| ID Validation
|--------------------------------------------------------------------------
*/

const serviceTestIdValidation = [
  param("id").isMongoId().withMessage("Invalid service test id."),
];

/*
|--------------------------------------------------------------------------
| Service ID Validation
|--------------------------------------------------------------------------
*/

const serviceIdValidation = [
  param("serviceId").isMongoId().withMessage("Invalid service id."),
];

/*
|--------------------------------------------------------------------------
| Status Validation
|--------------------------------------------------------------------------
*/

const updateStatusValidation = [
  param("id").isMongoId().withMessage("Invalid service test id."),

  body("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isBoolean()
    .withMessage("Invalid status."),
];

/*
|--------------------------------------------------------------------------
| Display Order Validation
|--------------------------------------------------------------------------
*/

const updateDisplayOrderValidation = [
  param("id").isMongoId().withMessage("Invalid service test id."),

  body("displayOrder")
    .notEmpty()
    .withMessage("Display order is required.")
    .isInt({ min: 1 })
    .withMessage("Display order must be greater than 0."),
];

/*
|--------------------------------------------------------------------------
| Listing Validation
|--------------------------------------------------------------------------
*/

const serviceTestListValidation = [
  query("page").optional().isInt({ min: 1 }),

  query("limit").optional().isInt({ min: 1 }),

  query("status").optional().isBoolean(),

  query("service").optional().isMongoId(),

  query("keyword").optional().trim(),
];

module.exports = {
  createServiceTestValidation,
  updateServiceTestValidation,
  serviceTestIdValidation,
  serviceIdValidation,
  updateStatusValidation,
  updateDisplayOrderValidation,
  serviceTestListValidation,
};
