const { validationResult } = require("express-validator");
const ServiceService = require("../../services/admin/service.service");
const serviceResponse = require("../../utils/serviceResponse");

class ServiceController {
  /**
   * Create Service
   */
  async createold(req, res, next) {
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

      const result = await ServiceService.create(payload);

      return res.status(201).json({
        success: true,
        message: "Service created successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create Service
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

      /*
    |--------------------------------------------------------------------------
    | Main Image
    |--------------------------------------------------------------------------
    */

      if (req.files && req.files.image && req.files.image.length) {
        payload.image = req.files.image[0].filename;
      }

      /*
    |--------------------------------------------------------------------------
    | Gallery Images
    |--------------------------------------------------------------------------
    */

      if (req.files && req.files.gallery && req.files.gallery.length) {
        payload.galleryFiles = req.files.gallery;
      }

      const result = await ServiceService.create(payload);

      return res.status(201).json({
        success: true,
        message: "Service created successfully.",
        data: serviceResponse(result),
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
      const result = await ServiceService.getAll(req.query);

      // return res.status(200).json({
      //   success: true,
      //   message: "Service list fetched successfully.",
      //   ...result,
      // });
      return res.status(200).json({
        success: true,
        message: "Service list fetched successfully.",

        data: result.data.map(serviceResponse),

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
   * Get Service By Id
   */
  async getById(req, res, next) {
    try {
      const result = await ServiceService.getById(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Service details fetched successfully.",
        data: serviceResponse(result),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Service
   */
  async updateold(req, res, next) {
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

      const result = await ServiceService.update(req.params.id, payload);

      return res.status(200).json({
        success: true,
        message: "Service updated successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  /**
   * Update Service
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

      /*
    |--------------------------------------------------------------------------
    | Main Image
    |--------------------------------------------------------------------------
    */

      if (req.files && req.files.image && req.files.image.length) {
        payload.image = req.files.image[0].filename;
      }

      /*
    |--------------------------------------------------------------------------
    | Gallery Images
    |--------------------------------------------------------------------------
    */

      if (req.files && req.files.gallery && req.files.gallery.length) {
        payload.galleryFiles = req.files.gallery;
      }

      const result = await ServiceService.update(req.params.id, payload);

      return res.status(200).json({
        success: true,
        message: "Service updated successfully.",
        data: serviceResponse(result),
      });
    } catch (error) {
      next(error);
    }
  }
  /**
   * Delete Service
   */
  async deleteold(req, res, next) {
    try {
      await ServiceService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Service deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Service
   */
  async delete(req, res, next) {
    try {
      await ServiceService.delete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Service deleted successfully.",
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
      const result = await ServiceService.updateStatus(
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
   * Update Home Status
   */
  async updateHome(req, res, next) {
    try {
      const result = await ServiceService.updateHome(
        req.params.id,
        req.body.showOnHome,
      );

      return res.status(200).json({
        success: true,
        message: "Home status updated successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Featured Status
   */
  async updateFeatured(req, res, next) {
    try {
      const result = await ServiceService.updateFeatured(
        req.params.id,
        req.body.isFeatured,
      );

      return res.status(200).json({
        success: true,
        message: "Featured status updated successfully.",
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
      const result = await ServiceService.updateDisplayOrder(
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
   * Website Service Listing
   */
  async getPublicServices(req, res, next) {
    try {
      const result = await ServiceService.getPublicServices();

      return res.status(200).json({
        success: true,
        data: serviceResponse(result),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Homepage Services
   */
  async getHomeServices(req, res, next) {
    try {
      const result = await ServiceService.getHomeServices();

      return res.status(200).json({
        success: true,
        data: serviceResponse(result),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Website Service Details
   */
  async getBySlug(req, res, next) {
    try {
      const result = await ServiceService.getBySlug(req.params.slug);

      return res.status(200).json({
        success: true,
        data: serviceResponse(result),
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteGalleryImage(req, res, next) {
    try {
      const service = await ServiceService.removeGalleryImage(
        req.params.id,
        req.params.imageId,
      );

      return res.json({
        success: true,
        message: "Gallery image deleted successfully.",
        data: service,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ServiceController();
