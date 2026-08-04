const ServiceTest = require("../../models/ServiceTest");

class ServiceTestRepository {
  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  async create(data) {
    return await ServiceTest.create(data);
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Id
  |--------------------------------------------------------------------------
  */

  async findById(id) {
    return await ServiceTest.findById(id)
      .populate("service", "title slug")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(id, data) {
    return await ServiceTest.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  async delete(id) {
    return await ServiceTest.findByIdAndDelete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Service
  |--------------------------------------------------------------------------
  */

  async findByService(serviceId) {
    return await ServiceTest.find({
      service: serviceId,
    })
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .populate("service", "title slug");
  }

  /*
  |--------------------------------------------------------------------------
  | Admin Listing
  |--------------------------------------------------------------------------
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

    const data = await ServiceTest.find(filters)
      .populate("service", "title slug")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await ServiceTest.countDocuments(filters);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Website Listing
  |--------------------------------------------------------------------------
  */

  async getPublicTests(serviceId) {
    return await ServiceTest.find({
      service: serviceId,
      status: true,
    })
      .sort({
        displayOrder: 1,
      })
      .populate("service", "title slug");
  }

  /*
  |--------------------------------------------------------------------------
  | Status
  |--------------------------------------------------------------------------
  */

  async updateStatus(id, status) {
    return await ServiceTest.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      },
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Display Order
  |--------------------------------------------------------------------------
  */

  async updateDisplayOrder(id, displayOrder) {
    return await ServiceTest.findByIdAndUpdate(
      id,
      {
        displayOrder,
      },
      {
        new: true,
      },
    );
  }

  async getByServices(serviceIds) {
    return await ServiceTest.find({
      service: { $in: serviceIds },
      status: true,
    })
      .sort({ displayOrder: 1 })
      .lean();
  }
  async getByService(serviceId) {
    return await ServiceTest.find({
      service: serviceId,
      status: true,
    })
      .sort({ displayOrder: 1 })
      .lean();
  }

  /*
  |--------------------------------------------------------------------------
  | Search Filters
  |--------------------------------------------------------------------------
  */

  buildFilters(query = {}) {
    const filters = {};

    if (query.keyword) {
      filters.$or = [
        {
          testName: {
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
        {
          description: {
            $regex: query.keyword,
            $options: "i",
          },
        },
      ];
    }

    if (query.service) {
      filters.service = query.service;
    }

    if (query.status !== undefined && query.status !== "") {
      filters.status = query.status === "true";
    }

    return filters;
  }
}

module.exports = new ServiceTestRepository();
