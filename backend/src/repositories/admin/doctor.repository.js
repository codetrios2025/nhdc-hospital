const Doctor = require("../../models/Doctor");

class DoctorRepository {
  async create(data) {
    const doctor = new Doctor(data);
    return await doctor.save();
  }

  async findByRegistrationNumber(registrationNumber) {
    return Doctor.findOne({
      registrationNumber,
      isDeleted: false,
    });
  }

  async registrationExists(registrationNumber) {
    return await Doctor.findOne({
      registrationNumber,

      isDeleted: false,
    });
  }

  async findById(id) {
    return await Doctor.findOne({
      _id: id,
      isDeleted: false,
    });
  }

  async findBySlug(slug) {
    return await Doctor.findOne({
      slug,
      isDeleted: false,
    });
  }

  async update(id, data) {
    // return await Doctor.findByIdAndUpdate(id, data, {
    //   new: true,
    //   runValidators: true,
    // });
    return await Doctor.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async softDeleteold(id, adminId) {
    return await Doctor.findByIdAndUpdate(
      id,

      {
        isDeleted: true,

        deletedAt: new Date(),

        deletedBy: adminId,
      },

      {
        new: true,
      },
    );
  }

  async softDelete(id, adminId) {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return null;
    }

    return await Doctor.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: adminId,

        // Release the slug
        slug: `${doctor.slug}-deleted-${Date.now()}`,
      },
      {
        new: true,
      },
    );
  }

  async changeStatus(id, isActive) {
    return await Doctor.findByIdAndUpdate(id, { isActive }, { new: true });
  }

  async toggleFeatured(id, featured) {
    return await Doctor.findByIdAndUpdate(id, { featured }, { new: true });
  }

  async getList(filters) {
    const {
      page = 1,
      limit = 10,
      search = "",
      status,
      department,
      designation,
      featured,
      sort = "displayOrder",
      order = "asc",
    } = filters;

    const query = {
      isDeleted: false,
    };

    if (search) {
      query.$or = [
        {
          firstName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          designation: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status !== undefined) {
      query.isActive = status;
    }

    if (featured !== undefined) {
      query.featured = featured;
    }

    if (department) {
      query.department = department;
    }

    if (designation) {
      query.designation = designation;
    }

    const total = await Doctor.countDocuments(query);

    const doctors = await Doctor.find(query)
      .populate("department", "name slug")
      .sort({
        [sort]: order === "asc" ? 1 : -1,
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return {
      doctors,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    };
  }
}

module.exports = new DoctorRepository();
