const HospitalHighlight = require("../../models/HospitalHighlight");

class HospitalHighlightRepository {
  /**
   * Create
   */
  async create(data) {
    return await HospitalHighlight.create(data);
  }

  /**
   * Find By ID
   */
  async findById(id) {
    return await HospitalHighlight.findById(id)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");
  }

  /**
   * Update
   */
  async update(id, data) {
    return await HospitalHighlight.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Delete
   */
  async delete(id) {
    return await HospitalHighlight.findByIdAndDelete(id);
  }

  /**
   * Admin Listing
   */
  async findAll(filters = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      sortBy = "order",
      sortOrder = "asc",
    } = options;

    const skip = (page - 1) * limit;

    const sort = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const data = await HospitalHighlight.find(filters)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await HospitalHighlight.countDocuments(filters);

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
  async getWebsiteData() {
    return await HospitalHighlight.find({
      isActive: true,
    }).sort({
      order: 1,
    });
  }

  /**
   * Status Toggle
   */
  async updateStatus(id, isActive) {
    return await HospitalHighlight.findByIdAndUpdate(
      id,
      {
        isActive,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Order Update
   */
  async updateOrder(id, order) {
    return await HospitalHighlight.findByIdAndUpdate(
      id,
      {
        order,
      },
      {
        new: true,
      },
    );
  }

  /**
   * Duplicate Title Check
   */
  async existsByTitle(title, excludeId = null) {
    const filter = {
      title: {
        $regex: new RegExp(`^${title}$`, "i"),
      },
    };

    if (excludeId) {
      filter._id = {
        $ne: excludeId,
      };
    }

    return await HospitalHighlight.exists(filter);
  }

  /**
   * Search Filters
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
          description: {
            $regex: query.keyword,
            $options: "i",
          },
        },
        {
          value: {
            $regex: query.keyword,
            $options: "i",
          },
        },
      ];
    }

    if (query.isActive !== undefined && query.isActive !== "") {
      filters.isActive = query.isActive === "true";
    }

    return filters;
  }
}

module.exports = new HospitalHighlightRepository();
