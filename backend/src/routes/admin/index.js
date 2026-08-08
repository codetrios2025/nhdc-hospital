const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");
const dashboardRoutes = require("./dashboard.routes");
const doctorRoutes = require("./doctor.routes");
const videoRoutes = require("./video.routes");
const serviceRoutes = require("./service.routes");
const appointmentRoutes = require("./appointment.routes");
const departmentRoutes = require("./department.routes");
const homeFeatureRoutes = require("./homeFeature.routes");
const diagnosticRoutes = require("./diagnostic.routes");
const serviceTestRoutes = require("./serviceTest.routes");
const contactRoutes = require("./contact.routes");
const hospitalHighlightRoutes = require("./hospitalHighlight.routes");
const notificationRoutes = require("./notification.routes");

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.use("/home-features", homeFeatureRoutes);

router.use("/auth", authRoutes);

router.use("/dashboard", dashboardRoutes);

router.use("/doctors", doctorRoutes);

router.use("/videos", videoRoutes);

router.use("/services", serviceRoutes);

router.use("/appointments", appointmentRoutes);

router.use("/departments", departmentRoutes);

router.use("/diagnostic-services", diagnosticRoutes);

router.use("/banner", require("./banner.routes"));

router.use("/service-tests", serviceTestRoutes);

router.use("/contact", contactRoutes);

router.use("/hospital-highlights", hospitalHighlightRoutes);

router.use("/notifications", notificationRoutes);

module.exports = router;
