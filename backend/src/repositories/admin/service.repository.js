const Service = require("../../models/Service");

class ServiceRepository {
  /**
   * Create Service
   */
  async create(data) {
    return await Service.create(data);
  }

  /**
   * Find By ID
   */
  async findById(id) {
    return await Service.findById(id)
      .populate("department", "name slug")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");
  }

  /**
   * Find By Slug
   */
  async findBySlug(slug) {
    return await Service.findOne({ slug });
  }

  /**
   * Update Service
   */
  async update(id, data) {
    return await Service.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async addGalleryImages(id, galleryImages) {
    return await Service.findByIdAndUpdate(
      id,
      {
        $push: {
          gallery: {
            $each: galleryImages,
          },
        },
      },
      {
        new: true,
      },
    );
  }

  /**
   * Remove Gallery Image
   */
  async removeGalleryImage(serviceId, imageId) {
    return await Service.findByIdAndUpdate(
      serviceId,
      {
        $pull: {
          gallery: {
            _id: imageId,
          },
        },
      },
      {
        new: true,
      },
    );
  }

  /**
   * Update Gallery Order
   */
  async updateGallery(serviceId, gallery) {
    return await Service.findByIdAndUpdate(
      serviceId,
      {
        gallery,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Delete Service
   */
  async delete(id) {
    return await Service.findByIdAndDelete(id);
  }

  /**
   * Admin Listing
   */
  async findAll(filters = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      sortBy = "displayOrder",
      sortOrder = "asc",
    } = options;

    const skip = (page - 1) * limit;

    const sort = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const data = await Service.find(filters)
      .populate("department", "name slug")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Service.countDocuments(filters);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Website Listing
   */
  async getPublicServices() {
    return await Service.find({
      status: true,
    })
      .populate("department", "name slug")
      .sort({
        displayOrder: 1,
      });
  }

  /**
   * Home Services
   */
  async getHomeServices() {
    return await Service.find({
      status: true,
      showOnHome: true,
    })
      .populate("department", "name slug")
      .sort({
        displayOrder: 1,
      });
  }

  /**
   * Service Details
   */
  async getBySlug(slug) {
    return await Service.findOne({
      slug,
      status: true,
    }).populate("department", "name slug");
  }

  /**
   * Status Toggle
   */
  async updateStatus(id, status) {
    return await Service.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Home Toggle
   */
  async updateHome(id, showOnHome) {
    return await Service.findByIdAndUpdate(
      id,
      {
        showOnHome,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Featured Toggle
   */
  async updateFeatured(id, isFeatured) {
    return await Service.findByIdAndUpdate(
      id,
      {
        isFeatured,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Display Order
   */
  async updateDisplayOrder(id, displayOrder) {
    return await Service.findByIdAndUpdate(
      id,
      {
        displayOrder,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Search Helper
   */
  buildFilters(query = {}) {
    const filters = {};

    if (query.keyword) {
      filters.$or = [
        {
          title: {
            $regex: query.keyword,
            $options: "i",
          },
        },
        {
          shortDescription: {
            $regex: query.keyword,
            $options: "i",
          },
        },
      ];
    }

    if (query.department) {
      filters.department = query.department;
    }

    if (query.status !== undefined && query.status !== "") {
      filters.status = query.status === "true";
    }

    if (query.showOnHome !== undefined && query.showOnHome !== "") {
      filters.showOnHome = query.showOnHome === "true";
    }

    if (query.isFeatured !== undefined && query.isFeatured !== "") {
      filters.isFeatured = query.isFeatured === "true";
    }

    return filters;
  }
}

module.exports = new ServiceRepository();
