const express = require("express");
const { body } = require("express-validator");

const DiagnosticController = require("../../controllers/admin/diagnostic.controller");

const verifyToken = require("../../middlewares/verifyToken");
const checkRole = require("../../middlewares/checkRole");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Validation Rules
|--------------------------------------------------------------------------
*/

const diagnosticValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters."),

  body("shortDescription")
    .trim()
    .notEmpty()
    .withMessage("Short Description is required.")
    .isLength({ max: 500 })
    .withMessage("Short Description cannot exceed 500 characters."),

  body("icon").trim().notEmpty().withMessage("Icon is required."),

  body("iconColor").optional().trim(),

  body("link").optional().trim(),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display Order must be a positive number."),

  body("status")
    .optional()
    .isBoolean()
    .withMessage("Status must be true or false."),
];

/*
|--------------------------------------------------------------------------
| CRUD Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  DiagnosticController.getAll,
);

router.get(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  DiagnosticController.getById,
);

router.post(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  diagnosticValidation,
  DiagnosticController.create,
);

router.put(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  diagnosticValidation,
  DiagnosticController.update,
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  DiagnosticController.delete,
);

/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/status",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  DiagnosticController.updateStatus,
);

/*
|--------------------------------------------------------------------------
| Display Order
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/display-order",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  DiagnosticController.updateDisplayOrder,
);

module.exports = router;
