const express = require("express");
const router = express.Router();

const AppointmentController = require("../../controllers/admin/appointment.controller");

const {
  updateAppointmentValidation,
  statusValidation,
  replyValidation,
} = require("../../validations/appointment.validation");

const verifyToken = require("../../middlewares/verifyToken");
const checkRole = require("../../middlewares/checkRole");

/*
|--------------------------------------------------------------------------
| Appointment Listing
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  AppointmentController.getAll,
);

/*
|--------------------------------------------------------------------------
| Appointment Details
|--------------------------------------------------------------------------
*/

router.get(
  "/statistics",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  AppointmentController.statistics,
);

router.get(
  "/today",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  AppointmentController.today,
);

router.get(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  AppointmentController.getById,
);

/*
|--------------------------------------------------------------------------
| Update Appointment
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  updateAppointmentValidation,
  AppointmentController.update,
);

/*
|--------------------------------------------------------------------------
| Delete Appointment
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  AppointmentController.delete,
);

/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

router.patch(
  "/status/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  statusValidation,
  AppointmentController.updateStatus,
);

/*
|--------------------------------------------------------------------------
| Admin Reply
|--------------------------------------------------------------------------
*/

router.post(
  "/reply/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  replyValidation,
  AppointmentController.saveReply,
);

module.exports = router;
