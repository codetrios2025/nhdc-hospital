const express = require("express");

const router = express.Router();

const HospitalHighlightController = require("../../controllers/admin/hospitalHighlight.controller");

const {
  createHospitalHighlightValidation,
  updateHospitalHighlightValidation,
} = require("../../validations/hospitalHighlight.validator");

const verifyToken = require("../../middlewares/verifyToken");
const checkRole = require("../../middlewares/checkRole");

/*
|--------------------------------------------------------------------------
| CRUD APIs
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  createHospitalHighlightValidation,
  HospitalHighlightController.create,
);

router.get(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  HospitalHighlightController.getAll,
);

router.get(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  HospitalHighlightController.getById,
);

router.put(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  updateHospitalHighlightValidation,
  HospitalHighlightController.update,
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  HospitalHighlightController.delete,
);

/*
|--------------------------------------------------------------------------
| Toggle APIs
|--------------------------------------------------------------------------
*/

router.patch(
  "/status/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  HospitalHighlightController.updateStatus,
);

router.patch(
  "/order/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  HospitalHighlightController.updateOrder,
);

module.exports = router;
