const express = require("express");

const router = express.Router();

const serviceRoutes = require("./service.routes");
const appointmentRoutes = require("./appointment.routes");
const departmentRoutes = require("./department.routes");

router.use("/services", serviceRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/departments", departmentRoutes);

module.exports = router;
