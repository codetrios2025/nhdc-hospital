const express = require("express");

const router = express.Router();

const VideoController = require("../../controllers/admin/video.controller");

/*
|--------------------------------------------------------------------------
| Website Videos
|--------------------------------------------------------------------------
*/

router.get("/", VideoController.getPublicVideos);

router.get("/home", VideoController.getHomeVideos);

router.get("/:slug", VideoController.getBySlug);

module.exports = router;
