const Banner = require("../../models/Banner");

class BannerRepository {
  /*
  |--------------------------------------------------------------------------
  | Build Filters
  |--------------------------------------------------------------------------
  */

  buildFilters(query = {}) {
    const filter = {};

    if (query.search) {
      filter.title = {
        $regex: query.search,
        $options: "i",
      };
    }

    if (query.status !== undefined && query.status !== "") {
      filter.status = query.status === "true";
    }

    return filter;
  }

  /*
  |--------------------------------------------------------------------------
  | Create Banner
  |--------------------------------------------------------------------------
  */

  async create(data) {
    return await Banner.create(data);
  }

  /*
  |--------------------------------------------------------------------------
  | Find Banner By ID
  |--------------------------------------------------------------------------
  */

  async findById(id) {
    return await Banner.findById(id)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");
  }

  /*
  |--------------------------------------------------------------------------
  | Find One
  |--------------------------------------------------------------------------
  */

  async findOne(filter = {}) {
    return await Banner.findOne(filter);
  }

  /*
  |--------------------------------------------------------------------------
  | Banner Listing
  |--------------------------------------------------------------------------
  */

  async findAll(filter = {}, options = {}) {
    const {
      skip = 0,
      limit = 10,
      sort = {
        displayOrder: 1,
        updatedAt: -1,
      },
    } = options;

    const [rows, total] = await Promise.all([
      Banner.find(filter)
        .populate("createdBy", "name email")
        .populate("updatedBy", "name email")
        .sort(sort)
        .skip(skip)
        .limit(limit),

      Banner.countDocuments(filter),
    ]);

    return {
      rows,
      total,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Update Banner
  |--------------------------------------------------------------------------
  */

  async update(id, data) {
    return await Banner.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      },
    )
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Banner
  |--------------------------------------------------------------------------
  */

  async delete(id) {
    return await Banner.findByIdAndDelete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Update Status
  |--------------------------------------------------------------------------
  */

  async updateStatus(id, status) {
    return await Banner.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
        },
      },
      {
        new: true,
      },
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Display Order
  |--------------------------------------------------------------------------
  */

  async findByDisplayOrder(displayOrder, excludeId = null) {
    const filter = {
      displayOrder,
    };

    if (excludeId) {
      filter._id = {
        $ne: excludeId,
      };
    }

    return await Banner.findOne(filter);
  }

  /*
  |--------------------------------------------------------------------------
  | Website Banner Listing
  |--------------------------------------------------------------------------
  */

  async websiteListing() {
    return await Banner.find({
      status: true,
    })
      .sort({
        displayOrder: 1,
        updatedAt: -1,
      })
      .lean();
  }

  /*
  |--------------------------------------------------------------------------
  | Count
  |--------------------------------------------------------------------------
  */

  async count(filter = {}) {
    return await Banner.countDocuments(filter);
  }
}

module.exports = new BannerRepository();
