const express = require("express");

const router = express.Router();

const HomeFeatureController = require("../../controllers/admin/homeFeature.controller");

const verifyToken = require("../../middlewares/verifyToken");

const checkRole = require("../../middlewares/checkRole");

const {
  createValidation,
  updateValidation,
} = require("../../validations/homeFeature.validator");

router.get(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  HomeFeatureController.getAll,
);

router.get(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  HomeFeatureController.getById,
);

router.post(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  createValidation,
  HomeFeatureController.create,
);

router.put(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  updateValidation,
  HomeFeatureController.update,
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  HomeFeatureController.delete,
);

router.patch(
  "/:id/status",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  HomeFeatureController.updateStatus,
);

router.patch(
  "/:id/display-order",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  HomeFeatureController.updateDisplayOrder,
);

module.exports = router;
