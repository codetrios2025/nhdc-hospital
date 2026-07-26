const { validationResult } = require("express-validator");

const DepartmentService = require("../../services/admin/department.service");

const ApiResponse = require("../../utils/ApiResponse");

class DepartmentController {
  /*
  |--------------------------------------------------------------------------
  | Create Department
  |--------------------------------------------------------------------------
  */

  async create1(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return ApiResponse.error(res, errors.array());
      }

      const department = await DepartmentService.create({
        ...req.body,
        createdBy: req.user?._id || null,
      });

      return ApiResponse.success(
        res,
        department,
        "Department created successfully.",
      );
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    console.log("STEP 1 Controller Start");

    try {
      console.log("STEP 2 Before Validation");

      const errors = validationResult(req);

      console.log("STEP 3 Validation Done");

      if (!errors.isEmpty()) {
        console.log(errors.array());
        return ApiResponse.error(res, errors.array(), 422);
      }

      console.log("STEP 4 Before Service");

      const department = await DepartmentService.create({
        ...req.body,
        createdBy: req.user?._id || null,
      });

      console.log("STEP 5 Service Returned");

      return res
        .status(201)
        .json(
          ApiResponse.created("Department created successfully.", department),
        );
    } catch (err) {
      console.error("Controller Error", err);
      next(err);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Department List
  |--------------------------------------------------------------------------
  */

  async getAll(req, res, next) {
    try {
      const departments = await DepartmentService.getAll(req.query);

      return res.json(
        ApiResponse.success(
          "Department list fetched successfully.",
          departments,
        ),
      );
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Department Details
  |--------------------------------------------------------------------------
  */

  async getById(req, res, next) {
    try {
      const department = await DepartmentService.getById(req.params.id);

      return res.json(
        ApiResponse.success(
          "Department details fetched successfully.",
          department,
        ),
      );
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Department By Slug (Website)
  |--------------------------------------------------------------------------
  */

  async getBySlug(req, res, next) {
    try {
      const department = await DepartmentService.getBySlug(req.params.slug);

      return ApiResponse.success(
        res,
        department,
        "Department fetched successfully.",
      );
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Update Department
  |--------------------------------------------------------------------------
  */

  async update(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return ApiResponse.error(res, errors.array());
      }

      const department = await DepartmentService.update(req.params.id, {
        ...req.body,
        updatedBy: req.user?._id || null,
      });

      return res
        .status(201)
        .json(
          ApiResponse.created("Department updated successfully.", department),
        );
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Department
  |--------------------------------------------------------------------------
  */

  async delete(req, res, next) {
    try {
      await DepartmentService.delete(req.params.id);

      return res.json(ApiResponse.success("Department deleted successfully."));
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Active Departments (Website)
  |--------------------------------------------------------------------------
  */

  async getActive(req, res, next) {
    try {
      const departments = await DepartmentService.getActiveDepartments();

      return ApiResponse.success(
        res,
        departments,
        "Active departments fetched successfully.",
      );
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Dropdown
  |--------------------------------------------------------------------------
  */

  async dropdown(req, res, next) {
    try {
      const departments = await DepartmentService.getDropdown();

      return res
        .status(201)
        .json(
          ApiResponse.success(
            "Department dropdown fetched successfully.",
            departments,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Statistics
  |--------------------------------------------------------------------------
  */

  async statistics(req, res, next) {
    try {
      const statistics = await DepartmentService.getStatistics();

      // return ApiResponse.success(
      //   res,
      //   statistics,
      //   "Department statistics fetched successfully.",
      // );

      return res
        .status(201)
        .json(
          ApiResponse.success(
            "Department statistics fetched successfully.",
            statistics,
          ),
        );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DepartmentController();
