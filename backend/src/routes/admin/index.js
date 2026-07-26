const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");
const dashboardRoutes = require("./dashboard.routes");
const doctorRoutes = require("./doctor.routes");
const videoRoutes = require("./video.routes");
const serviceRoutes = require("./service.routes");
const appointmentRoutes = require("./appointment.routes");
const departmentRoutes = require("./department.routes");

router.use("/auth", authRoutes);

router.use("/dashboard", dashboardRoutes);

router.use("/doctors", doctorRoutes);

router.use("/videos", videoRoutes);

router.use("/services", serviceRoutes);

router.use("/appointments", appointmentRoutes);

router.use("/departments", departmentRoutes);

module.exports = router;
