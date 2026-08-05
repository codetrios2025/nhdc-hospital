const express = require("express");

const router = express.Router();

const ContactController = require("../../controllers/admin/contact.controller");

router.get("/", ContactController.getPublicContact);

module.exports = router;
