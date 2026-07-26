const express = require("express");
const router = express.Router();

const controller = require("../controllers/service.controller");

router.get("/home", controller.homeServices);

router.get("/:slug", controller.serviceDetails);

module.exports = router;
