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

/**
 * Create Banner
 */
router.post(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  upload.any(),
  createBannerValidation,
  BannerController.create,
);

/**
 * Banner Listing
 */
router.get("/", verifyToken, checkRole("SUPER_ADMIN"), BannerController.list);

/**
 * Banner Details
 */
router.get(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  BannerController.details,
);

/**
 * Update Banner
 */
router.put(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  upload.any(),
  updateBannerValidation,
  BannerController.update,
);

/**
 * Delete Banner
 */
router.delete(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  BannerController.delete,
);

/**
 * Change Banner Status
 */
router.patch(
  "/status/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  BannerController.status,
);

module.exports = router;
