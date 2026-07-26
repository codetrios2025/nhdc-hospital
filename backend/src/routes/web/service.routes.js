const express = require("express");

const router = express.Router();

const ServiceController = require("../../controllers/admin/service.controller");

/*
|--------------------------------------------------------------------------
| Website Services
|--------------------------------------------------------------------------
*/

router.get("/", ServiceController.getPublicServices);

router.get("/home", ServiceController.getHomeServices);

router.get("/:slug", ServiceController.getBySlug);

module.exports = router;
