const DiagnosticService = require("../../models/DiagnosticService");

class DiagnosticRepository {
  /**
   * Create Diagnostic Service
   */
  async create(data) {
    return await DiagnosticService.create(data);
  }

  /**
   * Find By ID
   */
  async findById(id) {
    return await DiagnosticService.findById(id)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");
  }

  /**
   * Find By Title
   */
  async findByTitle(title) {
    return await DiagnosticService.findOne({
      title: {
        $regex: `^${title}$`,
        $options: "i",
      },
    });
  }

  /**
   * Update Diagnostic Service
   */
  async update(id, data) {
    return await DiagnosticService.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Delete Diagnostic Service
   */
  async delete(id) {
    return await DiagnosticService.findByIdAndDelete(id);
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

    const data = await DiagnosticService.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await DiagnosticService.countDocuments(filters);

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
  async getPublicList() {
    return await DiagnosticService.find({
      status: true,
    }).sort({
      displayOrder: 1,
    });
  }

  /**
   * Status Toggle
   */
  async updateStatus(id, status) {
    return await DiagnosticService.findByIdAndUpdate(
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
   * Display Order Update
   */
  async updateDisplayOrder(id, displayOrder) {
    return await DiagnosticService.findByIdAndUpdate(
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
   * Build Search Filters
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

    if (query.status !== undefined && query.status !== "") {
      filters.status = query.status === "true";
    }

    return filters;
  }
}

module.exports = new DiagnosticRepository();
