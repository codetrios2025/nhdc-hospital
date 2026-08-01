const { validationResult } = require("express-validator");

const DiagnosticService = require("../../services/admin/diagnostic.service");

class DiagnosticController {
  /**
   * Create Diagnostic Service
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

      const result = await DiagnosticService.create(payload);

      return res.status(201).json({
        success: true,
        message: "Diagnostic Service created successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Admin Listing
   */
  async getAll(req, res, next) {
    try {
      const result = await DiagnosticService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Diagnostic Service list fetched successfully.",
        data: result.data,
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get By ID
   */
  async getById(req, res, next) {
    try {
      const result = await DiagnosticService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Diagnostic Service details fetched successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Diagnostic Service
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

      const result = await DiagnosticService.update(req.params.id, payload);

      return res.status(200).json({
        success: true,
        message: "Diagnostic Service updated successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Diagnostic Service
   */
  async delete(req, res, next) {
    try {
      await DiagnosticService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Diagnostic Service deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Status
   */
  async updateStatus(req, res, next) {
    try {
      const result = await DiagnosticService.updateStatus(
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

  /**
   * Update Display Order
   */
  async updateDisplayOrder(req, res, next) {
    try {
      const result = await DiagnosticService.updateDisplayOrder(
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

  /**
   * Website Listing
   */
  async getPublicList(req, res, next) {
    try {
      const result = await DiagnosticService.getPublicList();

      return res.status(200).json({
        success: true,
        message: "Diagnostic Service list fetched successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Website Diagnostic Details
   */
  async getPublicById(req, res, next) {
    try {
      const result = await DiagnosticService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Diagnostic Service details fetched successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DiagnosticController();
