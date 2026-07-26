const express = require("express");
const router = express.Router();

const DepartmentController = require("../../controllers/admin/department.controller");

const {
  createDepartmentValidation,
  updateDepartmentValidation,
  departmentIdValidation,
  departmentListValidation,
} = require("../../validations/department.validation");

const verifyToken = require("../../middlewares/verifyToken");
const checkRole = require("../../middlewares/checkRole");

/*
|--------------------------------------------------------------------------
| Department Routes (Admin)
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  createDepartmentValidation,
  DepartmentController.create,
);

router.get(
  "/",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  departmentListValidation,
  DepartmentController.getAll,
);

router.get(
  "/statistics",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  DepartmentController.statistics,
);

router.get(
  "/dropdown",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  DepartmentController.dropdown,
);

router.get(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  departmentIdValidation,
  DepartmentController.getById,
);

router.put(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  updateDepartmentValidation,
  DepartmentController.update,
);

router.delete(
  "/:id",
  verifyToken,
  checkRole("SUPER_ADMIN"),
  departmentIdValidation,
  DepartmentController.delete,
);

module.exports = router;
