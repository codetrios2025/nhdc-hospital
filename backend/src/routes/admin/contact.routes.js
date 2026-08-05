const express = require("express");

const router = express.Router();

const ContactController = require("../../controllers/admin/contact.controller");
const validateContact = require("../../validations/contact.validator");

const verifyToken = require("../../middlewares/verifyToken");
const checkRole = require("../../middlewares/checkRole");

router.get(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  ContactController.getContact,
);

router.post(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  validateContact,
  ContactController.save,
);

module.exports = router;
