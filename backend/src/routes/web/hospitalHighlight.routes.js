const express = require("express");

const router = express.Router();

const HospitalHighlightController = require("../../controllers/admin/hospitalHighlight.controller");

/**
 * Website Listing
 */
router.get("/", HospitalHighlightController.getWebsiteData);

module.exports = router;
