const Appointment = require("../../models/Appointment");

class AppointmentRepository {
  /*
  |--------------------------------------------------------------------------
  | Create Appointment
  |--------------------------------------------------------------------------
  */

  async create(data) {
    return await Appointment.create(data);
  }

  /*
  |--------------------------------------------------------------------------
  | Find By ID
  |--------------------------------------------------------------------------
  */

  async findById(id) {
    return await Appointment.findById(id)
      .populate("department", "name slug")
      .populate("doctor", "name slug qualification")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */

  async update(id, data) {
    return await Appointment.findByIdAndUpdate(id, data, {
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
    return await Appointment.findByIdAndDelete(id);
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
      sortBy = "createdAt",
      sortOrder = "desc",
    } = options;

    const skip = (page - 1) * limit;

    const sort = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const data = await Appointment.find(filters)
      // .populate("department", "name slug")
      // .populate("doctor", "name slug qualification")
      .populate({
        path: "department",
        select: "name",
      })
      .populate({
        path: "doctor",
        select: "name",
      })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Appointment.countDocuments(filters);

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
  | Status Update
  |--------------------------------------------------------------------------
  */

  async updateStatus(id, status) {
    return await Appointment.findByIdAndUpdate(
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
  | Save Admin Reply
  |--------------------------------------------------------------------------
  */

  async saveReply(id, remarks) {
    return await Appointment.findByIdAndUpdate(
      id,
      {
        remarks,
        repliedAt: new Date(),
      },
      {
        new: true,
      },
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Search & Filters
  |--------------------------------------------------------------------------
  */

  buildFilters(query = {}) {
    const filters = {};

    /*
    ----------------------------------------
    Search
    ----------------------------------------
    */

    if (query.keyword) {
      filters.$or = [
        {
          patientName: {
            $regex: query.keyword,
            $options: "i",
          },
        },
        {
          email: {
            $regex: query.keyword,
            $options: "i",
          },
        },
        {
          mobile: {
            $regex: query.keyword,
            $options: "i",
          },
        },
      ];
    }

    /*
    ----------------------------------------
    Status
    ----------------------------------------
    */

    if (query.status) {
      filters.status = query.status;
    }

    /*
    ----------------------------------------
    Department
    ----------------------------------------
    */

    if (query.department) {
      filters.department = query.department;
    }

    /*
    ----------------------------------------
    Doctor
    ----------------------------------------
    */

    if (query.doctor) {
      filters.doctor = query.doctor;
    }

    /*
    ----------------------------------------
    Appointment Date
    ----------------------------------------
    */

    if (query.appointmentDate) {
      const start = new Date(query.appointmentDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(query.appointmentDate);
      end.setHours(23, 59, 59, 999);

      filters.appointmentDate = {
        $gte: start,
        $lte: end,
      };
    }

    /*
    ----------------------------------------
    Date Range
    ----------------------------------------
    */

    if (query.fromDate || query.toDate) {
      filters.appointmentDate = {};

      if (query.fromDate) {
        filters.appointmentDate.$gte = new Date(query.fromDate);
      }

      if (query.toDate) {
        const end = new Date(query.toDate);
        end.setHours(23, 59, 59, 999);

        filters.appointmentDate.$lte = end;
      }
    }

    return filters;
  }

  /*
  |--------------------------------------------------------------------------
  | Dashboard Statistics
  |--------------------------------------------------------------------------
  */

  async getStatistics() {
    const [total, newAppointments, confirmed, visited, cancelled] =
      await Promise.all([
        Appointment.countDocuments(),

        Appointment.countDocuments({
          status: "New",
        }),

        Appointment.countDocuments({
          status: "Confirmed",
        }),

        Appointment.countDocuments({
          status: "Visited",
        }),

        Appointment.countDocuments({
          status: "Cancelled",
        }),
      ]);

    return {
      total,
      newAppointments,
      confirmed,
      visited,
      cancelled,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Today's Appointments
  |--------------------------------------------------------------------------
  */

  async getTodayAppointments() {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    return await Appointment.find({
      appointmentDate: {
        $gte: today,
        $lt: tomorrow,
      },
    })
      .populate("department", "name")
      .populate("doctor", "name")
      .sort({
        appointmentDate: 1,
      });
  }
}

module.exports = new AppointmentRepository();
