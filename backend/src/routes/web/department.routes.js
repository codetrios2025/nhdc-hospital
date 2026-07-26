const express = require("express");
const router = express.Router();

const DepartmentController = require("../../controllers/admin/department.controller");

const {
  departmentSlugValidation,
} = require("../../validations/department.validation");

/*
|--------------------------------------------------------------------------
| Department Routes (Website)
|--------------------------------------------------------------------------
*/

router.get("/", DepartmentController.getActive);

router.get("/dropdown", DepartmentController.dropdown);

router.get("/:slug", departmentSlugValidation, DepartmentController.getBySlug);

module.exports = router;
