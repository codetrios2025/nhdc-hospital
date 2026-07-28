const express = require("express");

const router = express.Router();

const DoctorController = require("../../controllers/admin/doctor.controller");

/*
|--------------------------------------------------------------------------
| Website Doctors
|--------------------------------------------------------------------------
*/

router.get("/", DoctorController.getPublicDoctors);

router.get("/home", DoctorController.getHomeDoctors);

router.get("/:slug", DoctorController.getBySlug);

module.exports = router;
