const express = require("express");

const router = express.Router();

const NotificationController = require("../../controllers/admin/notification.controller");

const verifyToken = require("../../middlewares/verifyToken");
const checkRole = require("../../middlewares/checkRole");

router.post("/test-email", verifyToken, NotificationController.testEmail);

module.exports = router;
