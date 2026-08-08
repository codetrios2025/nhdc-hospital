const { validationResult } = require("express-validator");

const HospitalHighlightService = require("../../services/admin/hospitalHighlight.service");

class HospitalHighlightController {
  /**
   * Create Hospital Highlight
   */
  async create(req, res, next) {
    try {
      console.log("BODY =>", req.body);
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

      await HospitalHighlightService.validateTitle(payload.title);

      const result = await HospitalHighlightService.create(payload);

      return res.status(201).json({
        success: true,
        message: "Hospital Highlight created successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async createtest(req, res) {
    console.log("HEADERS:", req.headers);
    console.log("CONTENT TYPE:", req.headers["content-type"]);
    console.log("BODY:", req.body);

    res.json({
      headers: req.headers,
      body: req.body,
    });
  }

  /**
   * Admin Listing
   */
  async getAll(req, res, next) {
    try {
      const result = await HospitalHighlightService.getAll(req.query);

      return res.status(200).json({
        success: true,
        message: "Hospital Highlight list fetched successfully.",
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
      const result = await HospitalHighlightService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Hospital Highlight details fetched successfully.",
        data: result,
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

      const result = await HospitalHighlightService.update(
        req.params.id,
        payload,
      );

      return res.status(200).json({
        success: true,
        message: "Hospital Highlight updated successfully.",
        data: result,
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
      await HospitalHighlightService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Hospital Highlight deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Status Toggle
   */
  async updateStatus(req, res, next) {
    try {
      const result = await HospitalHighlightService.updateStatus(
        req.params.id,
        req.body.isActive,
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
   * Order Update
   */
  async updateOrder(req, res, next) {
    try {
      const result = await HospitalHighlightService.updateOrder(
        req.params.id,
        req.body.order,
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
  async getWebsiteData(req, res, next) {
    try {
      const result = await HospitalHighlightService.getWebsiteData();

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HospitalHighlightController();
