const { body } = require("express-validator");

const mobileRegex = /^[6-9]\d{9}$/;
const phoneRegex = /^[0-9+\-\s]{6,20}$/;

const validateContact = [
  body("hospitalName")
    .trim()
    .notEmpty()
    .withMessage("Hospital name is required.")
    .isLength({ min: 3, max: 150 })
    .withMessage("Hospital name must be between 3 and 150 characters."),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required.")
    .isLength({ min: 10, max: 500 })
    .withMessage("Address must be between 10 and 500 characters."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),

  body("contactFormRecipient")
    .trim()
    .notEmpty()
    .withMessage("Contact Form Recipient email is required.")
    .isEmail()
    .withMessage("Please enter a valid Contact Form Recipient email.")
    .normalizeEmail(),

  body("phoneNumbers")
    .isArray({ min: 1 })
    .withMessage("At least one contact number is required."),

  body("phoneNumbers.*")
    .trim()
    .matches(mobileRegex)
    .withMessage("Please enter a valid mobile number."),

  body("emergencyNumber")
    .optional({ checkFalsy: true })
    .trim()
    .matches(mobileRegex)
    .withMessage("Please enter a valid Emergency Contact Number."),

  body("whatsappNumber")
    .optional({ checkFalsy: true })
    .trim()
    .matches(mobileRegex)
    .withMessage("Please enter a valid WhatsApp Number."),

  body("receptionNumber")
    .optional({ checkFalsy: true })
    .trim()
    .matches(phoneRegex)
    .withMessage("Please enter a valid Reception Number."),

  body("opdNumber")
    .optional({ checkFalsy: true })
    .trim()
    .matches(phoneRegex)
    .withMessage("Please enter a valid OPD Enquiry Number."),

  body("ambulanceNumber")
    .optional({ checkFalsy: true })
    .trim()
    .matches(phoneRegex)
    .withMessage("Please enter a valid Ambulance Number."),

  body("workingHours.mondaySaturday.morning")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Morning working hours cannot exceed 100 characters."),

  body("workingHours.mondaySaturday.evening")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Evening working hours cannot exceed 100 characters."),

  body("workingHours.sunday.morning")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Sunday working hours cannot exceed 100 characters."),

  body("googleMap.embedUrl")
    .optional({ checkFalsy: true })
    .trim()
    .isURL({
      protocols: ["http", "https"],
      require_protocol: true,
    })
    .withMessage("Please enter a valid Google Map URL."),

  body("googleMap.latitude")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Latitude cannot exceed 50 characters."),

  body("googleMap.longitude")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Longitude cannot exceed 50 characters."),

  body("socialMedia.facebook")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Please enter a valid Facebook URL."),

  body("socialMedia.instagram")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Please enter a valid Instagram URL."),

  body("socialMedia.twitter")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Please enter a valid Twitter URL."),

  body("socialMedia.linkedin")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Please enter a valid LinkedIn URL."),

  body("socialMedia.youtube")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Please enter a valid YouTube URL."),

  body("seo.metaTitle")
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage("Meta Title cannot exceed 60 characters."),

  body("seo.metaDescription")
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage("Meta Description cannot exceed 160 characters."),

  body("seo.metaKeywords")
    .optional()
    .isArray()
    .withMessage("Meta Keywords must be an array."),

  body("seo.metaKeywords.*")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Each keyword cannot exceed 100 characters."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("Status must be true or false."),
];

module.exports = validateContact;
