const { body } = require("express-validator");

exports.createDoctorValidation = [
  body("firstName").notEmpty().withMessage("First name is required"),

  body("department").notEmpty().withMessage("Department is required"),

  body("designation").notEmpty().withMessage("Designation is required"),

  body("experience")
    .optional()
    .isNumeric()
    .withMessage("Experience must be numeric"),
];

exports.updateDoctorValidation = [
  body("firstName").optional().notEmpty().withMessage("First name is required"),

  body("lastName").optional().notEmpty().withMessage("Last name is required"),

  body("department")
    .optional()
    .notEmpty()
    .withMessage("Department is required"),

  body("designation")
    .optional()
    .notEmpty()
    .withMessage("Designation is required"),

  body("qualification")
    .optional()
    .notEmpty()
    .withMessage("Qualification is required"),

  body("experience")
    .optional()
    .isNumeric()
    .withMessage("Experience must be numeric"),
];
