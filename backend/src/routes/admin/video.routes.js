const express = require("express");

const router = express.Router();

const verifyToken = require("../../middlewares/verifyToken");

const uploadVideo = require("../../middlewares/uploadVideo");

const VideoController = require("../../controllers/admin/video.controller");

const validationMiddleware = require("../../middlewares/validate.middleware");

const { createVideoValidation } = require("../../validations/video.validation");

//router.use(verifyToken);

/*
|--------------------------------------------------------------------------
| Create Video
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  verifyToken,
  uploadVideo.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "videoFile",
      maxCount: 1,
    },
  ]),

  createVideoValidation,

  validationMiddleware,

  VideoController.create,
);

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

router.get("/", VideoController.list);

/*
|--------------------------------------------------------------------------
| Details
|--------------------------------------------------------------------------
*/

router.get("/:id", verifyToken, VideoController.details);

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  verifyToken,
  uploadVideo.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "videoFile",
      maxCount: 1,
    },
  ]),

  VideoController.update,
);

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

router.delete("/:id", verifyToken, VideoController.delete);

/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

router.patch("/:id/status", verifyToken, VideoController.status);

/*
|--------------------------------------------------------------------------
| Featured
|--------------------------------------------------------------------------
*/

router.patch("/:id/featured", verifyToken, VideoController.featured);

module.exports = router;
