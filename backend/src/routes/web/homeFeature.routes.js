const express = require("express");

const router = express.Router();

const HomeFeatureController = require("../../controllers/admin/homeFeature.controller");

router.get("/", HomeFeatureController.getPublicHomeFeatures);

module.exports = router;
