const express = require("express");

const router = express.Router();

const DoctorController = require("../../controllers/admin/doctor.controller");

const verifyToken = require("../../middlewares/verifyToken");

const uploadDoctor = require("../../middlewares/uploadDoctor");

const validationMiddleware = require("../../middlewares/validate.middleware");

const {
  createDoctorValidation,

  updateDoctorValidation,
} = require("../../validations/doctor.validation");

//router.use(verifyToken);

/*
|--------------------------------------------------------------------------
| Create Doctor
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  verifyToken,
  uploadDoctor.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },

    {
      name: "gallery",
      maxCount: 20,
    },
  ]),

  createDoctorValidation,

  validationMiddleware,

  DoctorController.create,
);

/*
|--------------------------------------------------------------------------
| Doctor Listing
|--------------------------------------------------------------------------
*/

router.get(
  "/",

  DoctorController.list,
);

/*
|--------------------------------------------------------------------------
| Doctor Details
|--------------------------------------------------------------------------
*/

router.get("/:id", verifyToken, DoctorController.details);

/*
|--------------------------------------------------------------------------
| Update Doctor
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  verifyToken,
  uploadDoctor.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
    {
      name: "gallery",
      maxCount: 20,
    },
  ]),

  updateDoctorValidation,

  validationMiddleware,

  DoctorController.update,
);

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

router.delete("/:id", verifyToken, DoctorController.delete);

/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

router.patch("/:id/status", verifyToken, DoctorController.status);

/*
|--------------------------------------------------------------------------
| Featured
|--------------------------------------------------------------------------
*/

router.patch("/:id/featured", verifyToken, DoctorController.featured);

module.exports = router;
