const Department = require("../../models/Department");

class DepartmentRepository {
  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */

  async create(data) {
    return await Department.create(data);
  }

  /*
  |--------------------------------------------------------------------------
  | Find By ID
  |--------------------------------------------------------------------------
  */

  async findById(id) {
    return await Department.findById(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Slug
  |--------------------------------------------------------------------------
  */

  async findBySlug(slug) {
    return await Department.findOne({ slug });
  }

  /*
  |--------------------------------------------------------------------------
  | Find By Name
  |--------------------------------------------------------------------------
  */

  async findByName(name) {
    return await Department.findOne({
      name: name.trim(),
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(id, data) {
    return await Department.findByIdAndUpdate(id, data, {
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
    return await Department.findByIdAndDelete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | List
  |--------------------------------------------------------------------------
  */

  async findAll(filters = {}) {
    const {
      page = 1,
      limit = 10,
      search = "",
      status,
      featured,
      sortBy = "sortOrder",
      sortOrder = "asc",
    } = filters;

    const query = {};

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          shortDescription: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status !== undefined && status !== "") {
      query.status = status === "true" || status === true;
    }

    if (featured !== undefined && featured !== "") {
      query.featured = featured === "true" || featured === true;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [rows, total] = await Promise.all([
      Department.find(query)
        .sort({
          [sortBy]: sortOrder === "desc" ? -1 : 1,
        })
        .skip(skip)
        .limit(Number(limit)),

      Department.countDocuments(query),
    ]);

    return {
      rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Active Departments (Website)
  |--------------------------------------------------------------------------
  */

  async findActive() {
    return await Department.find({
      status: true,
    }).sort({
      sortOrder: 1,
      name: 1,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Dropdown
  |--------------------------------------------------------------------------
  */

  async dropdown() {
    return await Department.find(
      {
        status: true,
      },
      {
        name: 1,
        slug: 1,
      },
    ).sort({
      sortOrder: 1,
      name: 1,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Statistics
  |--------------------------------------------------------------------------
  */

  async statistics() {
    const [total, active, inactive, featured] = await Promise.all([
      Department.countDocuments(),

      Department.countDocuments({
        status: true,
      }),

      Department.countDocuments({
        status: false,
      }),

      Department.countDocuments({
        featured: true,
      }),
    ]);

    return {
      total,
      active,
      inactive,
      featured,
    };
  }
}

module.exports = new DepartmentRepository();
