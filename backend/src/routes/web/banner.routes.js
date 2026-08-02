const express = require("express");

const router = express.Router();

const BannerController = require("../../controllers/admin/banner.controller");

/*
|--------------------------------------------------------------------------
| Website Banner
|--------------------------------------------------------------------------
*/

router.get("/", BannerController.getWebsiteBanners);

module.exports = router;
