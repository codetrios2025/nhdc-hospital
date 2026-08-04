const { validationResult } = require("express-validator");

const ServiceTestService = require("../../services/admin/serviceTest.service");
const serviceTestResponse = require("../../utils/serviceTestResponse");

class ServiceTestController {
  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  async create(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: "Validation failed.",
          errors: errors.array(),
        });
      }

      const payload = {
        ...req.body,
        createdBy: req.user?._id || req.user?.id,
      };

      if (req.file) {
        payload.image = req.file.filename;
      }

      const result = await ServiceTestService.create(payload);

      return res.status(201).json({
        success: true,
        message: "Service test created successfully.",
        data: serviceTestResponse(result),
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Listing
  |--------------------------------------------------------------------------
  */

  async getAll(req, res, next) {
    try {
      const result = await ServiceTestService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Service tests fetched successfully.",

        data: result.data.map(serviceTestResponse),

        total: result.total,

        page: result.page,

        limit: result.limit,

        totalPages: result.totalPages,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Details
  |--------------------------------------------------------------------------
  */

  async getById(req, res, next) {
    try {
      const result = await ServiceTestService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Service test details fetched successfully.",
        data: serviceTestResponse(result),
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Tests By Service
  |--------------------------------------------------------------------------
  */

  async getByService(req, res, next) {
    try {
      const result = await ServiceTestService.getByService(
        req.params.serviceId,
      );

      return res.status(200).json({
        success: true,
        message: "Service tests fetched successfully.",
        data: result.map(serviceTestResponse),
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          message: "Validation failed.",
          errors: errors.array(),
        });
      }

      const payload = {
        ...req.body,
        updatedBy: req.user?._id || req.user?.id,
      };

      if (req.file) {
        payload.image = req.file.filename;
      }

      const result = await ServiceTestService.update(req.params.id, payload);

      return res.status(200).json({
        success: true,
        message: "Service test updated successfully.",
        data: serviceTestResponse(result),
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  async delete(req, res, next) {
    try {
      await ServiceTestService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Service test deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Status
  |--------------------------------------------------------------------------
  */

  async updateStatus(req, res, next) {
    try {
      const result = await ServiceTestService.updateStatus(
        req.params.id,
        req.body.status,
      );

      return res.status(200).json({
        success: true,
        message: "Status updated successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Display Order
  |--------------------------------------------------------------------------
  */

  async updateDisplayOrder(req, res, next) {
    try {
      const result = await ServiceTestService.updateDisplayOrder(
        req.params.id,
        req.body.displayOrder,
      );

      return res.status(200).json({
        success: true,
        message: "Display order updated successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Website
  |--------------------------------------------------------------------------
  */

  async getPublicTests(req, res, next) {
    try {
      const result = await ServiceTestService.getPublicTests(
        req.params.serviceId,
      );

      return res.status(200).json({
        success: true,
        data: result.map(serviceTestResponse),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ServiceTestController();
