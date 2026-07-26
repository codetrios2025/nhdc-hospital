const express = require("express");
const router = express.Router();

const ServiceController = require("../../controllers/admin/service.controller");

const upload = require("../../middlewares/uploadService");

const {
  createServiceValidation,
  updateServiceValidation,
} = require("../../validations/service.validation");

const verifyToken = require("../../middlewares/verifyToken");
const checkRole = require("../../middlewares/checkRole");

/*
|--------------------------------------------------------------------------
| Service CRUD
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 20,
    },
  ]),
  createServiceValidation,
  ServiceController.create,
);

router.get(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  ServiceController.getAll,
);

router.get(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  ServiceController.getById,
);

router.put(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 20,
    },
  ]),
  updateServiceValidation,
  ServiceController.update,
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  ServiceController.delete,
);

router.delete(
  "/:id/gallery/:imageId",
  verifyToken,
  checkRole("Admin"),
  ServiceController.deleteGalleryImage,
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
  ServiceController.updateStatus,
);

router.patch(
  "/home/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  ServiceController.updateHome,
);

router.patch(
  "/featured/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  ServiceController.updateFeatured,
);

router.patch(
  "/order/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  ServiceController.updateDisplayOrder,
);

module.exports = router;
