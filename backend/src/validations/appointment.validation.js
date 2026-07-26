const { body } = require("express-validator");

/*
|--------------------------------------------------------------------------
| Create Appointment Validation
|--------------------------------------------------------------------------
*/

const createAppointmentValidation = [
  body("patientName")
    .trim()
    .notEmpty()
    .withMessage("Patient name is required.")
    .isLength({ min: 2, max: 150 })
    .withMessage("Patient name must be between 2 and 150 characters."),

  body("age")
    .notEmpty()
    .withMessage("Age is required.")
    .isInt({ min: 0, max: 120 })
    .withMessage("Age must be between 0 and 120."),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required.")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender."),

  body("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required.")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Enter a valid 10 digit mobile number."),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Enter a valid email address.")
    .normalizeEmail(),

  body("appointmentDate")
    .notEmpty()
    .withMessage("Appointment date is required.")
    .isISO8601()
    .withMessage("Invalid appointment date.")
    .toDate(),

  body("department")
    .optional({ checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid department"),

  body("doctor")
    .optional({ checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid doctor"),

  body("address")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Address cannot exceed 500 characters."),

  body("reason")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Reason cannot exceed 1000 characters."),
];

/*
|--------------------------------------------------------------------------
| Update Appointment Validation
|--------------------------------------------------------------------------
*/

const updateAppointmentValidation = [
  body("patientName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage("Patient name must be between 2 and 150 characters."),

  body("age")
    .optional()
    .isInt({ min: 0, max: 120 })
    .withMessage("Age must be between 0 and 120."),

  body("gender")
    .optional()
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender."),

  body("mobile")
    .optional()
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Enter a valid 10 digit mobile number."),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Enter a valid email address.")
    .normalizeEmail(),

  body("appointmentDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid appointment date.")
    .toDate(),

  body("department").optional().isMongoId().withMessage("Invalid department."),

  body("doctor")
    .optional({ checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid doctor."),

  body("address")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Address cannot exceed 500 characters."),

  body("reason")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Reason cannot exceed 1000 characters."),

  body("status")
    .optional()
    .isIn(["New", "Confirmed", "Visited", "Cancelled"])
    .withMessage("Invalid appointment status."),

  body("remarks")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Remarks cannot exceed 2000 characters."),
];

/*
|--------------------------------------------------------------------------
| Reply Validation
|--------------------------------------------------------------------------
*/

const replyValidation = [
  body("remarks")
    .trim()
    .notEmpty()
    .withMessage("Reply message is required.")
    .isLength({ max: 2000 })
    .withMessage("Reply cannot exceed 2000 characters."),
];

/*
|--------------------------------------------------------------------------
| Status Validation
|--------------------------------------------------------------------------
*/

const statusValidation = [
  body("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["New", "Confirmed", "Visited", "Cancelled"])
    .withMessage("Invalid appointment status."),
];

module.exports = {
  createAppointmentValidation,
  updateAppointmentValidation,
  replyValidation,
  statusValidation,
};
