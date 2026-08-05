const express = require("express");

const router = express.Router();

const serviceRoutes = require("./service.routes");
const appointmentRoutes = require("./appointment.routes");
const departmentRoutes = require("./department.routes");
const homeFeatureRoutes = require("./homeFeature.routes");
const diagnosticRoutes = require("./diagnostic.routes");
const contactRoutes = require("./contact.routes");

/*
|--------------------------------------------------------------------------
| Website Routes
|--------------------------------------------------------------------------
*/

router.use("/services", serviceRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/departments", departmentRoutes);
router.use("/doctors", require("./doctor.routes"));
router.use("/videos", require("./video.routes"));
router.use("/home-features", homeFeatureRoutes);
router.use("/diagnostic-services", diagnosticRoutes);
router.use("/banner", require("./banner.routes"));
router.use("/contact", contactRoutes);

module.exports = router;
