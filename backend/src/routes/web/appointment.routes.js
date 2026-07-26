const express = require("express");
const router = express.Router();

const AppointmentController = require("../../controllers/admin/appointment.controller");

const {
  createAppointmentValidation,
} = require("../../validations/appointment.validation");

/*
|--------------------------------------------------------------------------
| Book Appointment
|--------------------------------------------------------------------------
*/

router.post("/", createAppointmentValidation, AppointmentController.create);

module.exports = router;
