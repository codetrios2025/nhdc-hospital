const express = require("express");

const router = express.Router();

const ServiceTestController = require("../../controllers/admin/serviceTest.controller");

const upload = require("../../middlewares/uploadServiceTest");

const verifyToken = require("../../middlewares/verifyToken");
const checkRole = require("../../middlewares/checkRole");

const {
  createServiceTestValidation,
  updateServiceTestValidation,
  serviceTestIdValidation,
  serviceIdValidation,
  updateStatusValidation,
  updateDisplayOrderValidation,
  serviceTestListValidation,
} = require("../../validations/serviceTest.validation");

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  upload.single("image"),
  createServiceTestValidation,
  ServiceTestController.create,
);

/*
|--------------------------------------------------------------------------
| Listing
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  serviceTestListValidation,
  ServiceTestController.getAll,
);

/*
|--------------------------------------------------------------------------
| Details
|--------------------------------------------------------------------------
*/

router.get(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  serviceTestIdValidation,
  ServiceTestController.getById,
);

/*
|--------------------------------------------------------------------------
| Service Wise Tests
|--------------------------------------------------------------------------
*/

router.get(
  "/service/:serviceId",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  serviceIdValidation,
  ServiceTestController.getByService,
);

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  upload.single("image"),
  updateServiceTestValidation,
  ServiceTestController.update,
);

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  serviceTestIdValidation,
  ServiceTestController.delete,
);

/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

router.patch(
  "/status/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  updateStatusValidation,
  ServiceTestController.updateStatus,
);

/*
|--------------------------------------------------------------------------
| Display Order
|--------------------------------------------------------------------------
*/

router.patch(
  "/display-order/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  updateDisplayOrderValidation,
  ServiceTestController.updateDisplayOrder,
);

module.exports = router;
