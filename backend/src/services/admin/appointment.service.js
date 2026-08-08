const repository = require("../../repositories/admin/appointment.repository");
const AppointmentNotification = require("../../notifications/events/appointment.notification");

class AppointmentService {
  /*
  |--------------------------------------------------------------------------
  | Create Appointment
  |--------------------------------------------------------------------------
  */

  async create(data) {
    if (!data.department) {
      data.department = null;
    }

    if (!data.doctor) {
      data.doctor = null;
    }

    const appointment = await repository.create(data);

    // Send notifications (don't block API if notification fails)
    try {
      await AppointmentNotification.booked(appointment);
    } catch (error) {
      console.error("Appointment booked notification failed:", error);
    }

    return appointment;
  }

  /*
  |--------------------------------------------------------------------------
  | Appointment Listing
  |--------------------------------------------------------------------------
  */

  async getAll(query) {
    const filters = repository.buildFilters(query);

    return repository.findAll(filters, {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      sortBy: query.sortBy || "createdAt",
      sortOrder: query.sortOrder || "desc",
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Appointment Details
  |--------------------------------------------------------------------------
  */

  async getById(id) {
    const appointment = await repository.findById(id);

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    return appointment;
  }

  /*
  |--------------------------------------------------------------------------
  | Update Appointment
  |--------------------------------------------------------------------------
  */

  async update(id, data) {
    const appointment = await repository.findById(id);

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    if (!data.department) {
      data.department = null;
    }

    if (!data.doctor) {
      data.doctor = null;
    }

    return repository.update(id, data);
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Appointment
  |--------------------------------------------------------------------------
  */

  async delete(id) {
    const appointment = await repository.findById(id);

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    return repository.delete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Update Appointment Status
  |--------------------------------------------------------------------------
  */

  async updateStatus(id, status, appointmentTime) {
    const appointment = await repository.updateStatus(
      id,
      status,
      appointmentTime,
    );

    try {
      switch (status) {
        case "Confirmed":
          await AppointmentNotification.confirmed(appointment);
          break;

        case "Cancelled":
          await AppointmentNotification.cancelled(appointment);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Status notification failed:", error);
    }

    return appointment;
  }

  /*
  |--------------------------------------------------------------------------
  | Save Admin Remark
  |--------------------------------------------------------------------------
  */

  async saveReply(id, remarks) {
    const appointment = await repository.findById(id);

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    const updatedAppointment = await repository.saveReply(id, remarks);

    try {
      await AppointmentNotification.remark(updatedAppointment, remarks);
    } catch (error) {
      console.error("Remark notification failed:", error);
    }

    return updatedAppointment;
  }

  /*
  |--------------------------------------------------------------------------
  | Dashboard Statistics
  |--------------------------------------------------------------------------
  */

  async getStatistics() {
    return repository.getStatistics();
  }

  /*
  |--------------------------------------------------------------------------
  | Today's Appointments
  |--------------------------------------------------------------------------
  */

  async getTodayAppointments() {
    return repository.getTodayAppointments();
  }
}

module.exports = new AppointmentService();
