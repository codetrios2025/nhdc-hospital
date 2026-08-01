const { validationResult } = require("express-validator");

const HomeFeatureService = require("../../services/admin/homeFeature.service");

const homeFeatureResponse = require("../../utils/homeFeatureResponse");

class HomeFeatureController {
  /**
   * Create Home Feature
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

      const result = await HomeFeatureService.create(payload);

      return res.status(201).json({
        success: true,
        message: "Home Feature created successfully.",
        data: homeFeatureResponse(result),
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
      const result = await HomeFeatureService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Home Feature list fetched successfully.",

        data: result.data.map(homeFeatureResponse),

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
   * Get By Id
   */
  async getById(req, res, next) {
    try {
      const result = await HomeFeatureService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Home Feature details fetched successfully.",
        data: homeFeatureResponse(result),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update
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

      const result = await HomeFeatureService.update(req.params.id, payload);

      return res.status(200).json({
        success: true,
        message: "Home Feature updated successfully.",
        data: homeFeatureResponse(result),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete
   */
  async delete(req, res, next) {
    try {
      await HomeFeatureService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Home Feature deleted successfully.",
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
      const result = await HomeFeatureService.updateStatus(
        req.params.id,
        req.body.status,
      );

      return res.status(200).json({
        success: true,
        message: "Status updated successfully.",
        data: homeFeatureResponse(result),
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
      const result = await HomeFeatureService.updateDisplayOrder(
        req.params.id,
        req.body.displayOrder,
      );

      return res.status(200).json({
        success: true,
        message: "Display order updated successfully.",
        data: homeFeatureResponse(result),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Website Listing
   */
  async getPublicHomeFeatures(req, res, next) {
    try {
      const result = await HomeFeatureService.getPublicHomeFeatures();

      return res.status(200).json({
        success: true,
        data: homeFeatureResponse(result),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HomeFeatureController();
