const express = require("express");

const router = express.Router();

const BannerController = require("../../controllers/admin/banner.controller");

const upload = require("../../middlewares/uploadBanner");

const {
  createBannerValidation,
  updateBannerValidation,
} = require("../../validations/banner.validation");

const verifyToken = require("../../middlewares/verifyToken");
const checkRole = require("../../middlewares/checkRole");

/*
|--------------------------------------------------------------------------
| Banner CRUD
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  upload.fields([
    {
      name: "desktopImage",
      maxCount: 1,
    },
    {
      name: "mobileImage",
      maxCount: 1,
    },
  ]),
  createBannerValidation,
  BannerController.create,
);

/*
|--------------------------------------------------------------------------
| Admin Listing
|--------------------------------------------------------------------------
*/

router.get("/", verifyToken, checkRole("SUPER_ADMIN"), BannerController.list);

/*
|--------------------------------------------------------------------------
| Banner Details
|--------------------------------------------------------------------------
*/

router.get(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  BannerController.details,
);

/*
|--------------------------------------------------------------------------
| Update Banner
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  upload.fields([
    {
      name: "desktopImage",
      maxCount: 1,
    },
    {
      name: "mobileImage",
      maxCount: 1,
    },
  ]),
  updateBannerValidation,
  BannerController.update,
);

/*
|--------------------------------------------------------------------------
| Delete Banner
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  BannerController.delete,
);

/*
|--------------------------------------------------------------------------
| Update Status
|--------------------------------------------------------------------------
*/

router.patch(
  "/status/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  BannerController.status,
);

module.exports = router;
