const { body, param, query } = require("express-validator");

const createDepartmentValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Department name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage("Department name must be between 2 and 100 characters."),

  body("shortDescription")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Short description cannot exceed 500 characters."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a valid string."),

  body("sortOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Sort order must be a positive integer."),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false."),

  body("status")
    .optional()
    .isBoolean()
    .withMessage("Status must be true or false."),

  body("seoTitle")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("SEO title cannot exceed 255 characters."),

  body("seoDescription")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("SEO description cannot exceed 500 characters."),

  body("seoKeywords")
    .optional()
    .custom((value) => {
      if (Array.isArray(value)) return true;
      if (typeof value === "string") return true;
      throw new Error(
        "SEO keywords must be an array or comma-separated string.",
      );
    }),
];

const updateDepartmentValidation = [
  param("id").isMongoId().withMessage("Invalid Department ID."),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Department name must be between 2 and 100 characters."),

  body("shortDescription")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Short description cannot exceed 500 characters."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a valid string."),

  body("sortOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Sort order must be a positive integer."),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false."),

  body("status")
    .optional()
    .isBoolean()
    .withMessage("Status must be true or false."),

  body("seoTitle")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("SEO title cannot exceed 255 characters."),

  body("seoDescription")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("SEO description cannot exceed 500 characters."),

  body("seoKeywords")
    .optional()
    .custom((value) => {
      if (Array.isArray(value)) return true;
      if (typeof value === "string") return true;
      throw new Error(
        "SEO keywords must be an array or comma-separated string.",
      );
    }),
];

const departmentIdValidation = [
  param("id").isMongoId().withMessage("Invalid Department ID."),
];

const departmentSlugValidation = [
  param("slug").trim().notEmpty().withMessage("Department slug is required."),
];

const departmentListValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be greater than 0."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),

  query("status")
    .optional()
    .isBoolean()
    .withMessage("Status must be true or false."),

  query("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false."),

  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Sort order must be asc or desc."),
];

module.exports = {
  createDepartmentValidation,
  updateDepartmentValidation,
  departmentIdValidation,
  departmentSlugValidation,
  departmentListValidation,
};
