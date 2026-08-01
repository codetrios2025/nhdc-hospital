const HomeFeature = require("../../models/HomeFeature");

class HomeFeatureRepository {
  /**
   * Create Home Feature
   */
  async create(data) {
    return await HomeFeature.create(data);
  }

  /**
   * Find By ID
   */
  async findById(id) {
    return await HomeFeature.findById(id)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");
  }

  /**
   * Find By Title
   */
  async findByTitle(title) {
    return await HomeFeature.findOne({
      title: {
        $regex: `^${title}$`,
        $options: "i",
      },
    });
  }

  /**
   * Update
   */
  async update(id, data) {
    return await HomeFeature.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Delete
   */
  async delete(id) {
    return await HomeFeature.findByIdAndDelete(id);
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

    const data = await HomeFeature.find(filters)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await HomeFeature.countDocuments(filters);

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
  async getPublicHomeFeatures() {
    return await HomeFeature.find({
      status: true,
    }).sort({
      displayOrder: 1,
    });
  }

  /**
   * Update Status
   */
  async updateStatus(id, status) {
    return await HomeFeature.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      },
    );
  }

  /**
   * Update Display Order
   */
  async updateDisplayOrder(id, displayOrder) {
    return await HomeFeature.findByIdAndUpdate(
      id,
      { displayOrder },
      {
        new: true,
      },
    );
  }

  /**
   * Build Filters
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
          subtitle: {
            $regex: query.keyword,
            $options: "i",
          },
        },
      ];
    }

    if (query.status !== undefined && query.status !== "") {
      filters.status = query.status === "true";
    }

    return filters;
  }
}

module.exports = new HomeFeatureRepository();
