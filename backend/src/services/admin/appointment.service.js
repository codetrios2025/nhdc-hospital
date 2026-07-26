const repository = require("../../repositories/admin/appointment.repository");
// const EmailService = require("../notification/email.service");
// const AppointmentTemplate = require("../../templates/emails/appointment.template");
const NotificationService = require("../notification/notification.service");

class AppointmentService {
  /*
  |--------------------------------------------------------------------------
  | Create Appointment
  |--------------------------------------------------------------------------
  */

  async create(data) {
    // Convert empty values to null
    if (!data.department) {
      data.department = null;
    }

    if (!data.doctor) {
      data.doctor = null;
    }

    const appointment = await repository.create(data);

    await NotificationService.appointmentCreated(appointment);

    return appointment;
  }

  /*
  |--------------------------------------------------------------------------
  | Admin Listing
  |--------------------------------------------------------------------------
  */

  async getAll(query) {
    const filters = repository.buildFilters(query);

    return await repository.findAll(filters, {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      sortBy: query.sortBy || "createdAt",
      sortOrder: query.sortOrder || "desc",
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Details
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

    // Convert empty values to null
    if (!data.department) {
      data.department = null;
    }

    if (!data.doctor) {
      data.doctor = null;
    }

    return await repository.update(id, data);
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

    return await repository.delete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Update Status
  |--------------------------------------------------------------------------
  */

  async updateStatus(id, status) {
    const appointment = await repository.updateStatus(id, status);

    switch (status) {
      case "Confirmed":
        await NotificationService.appointmentConfirmed(appointment);

        break;

      case "Cancelled":
        await NotificationService.appointmentCancelled(appointment);

        break;
    }

    return appointment;
  }

  /*
  |--------------------------------------------------------------------------
  | Save Admin Reply
  |--------------------------------------------------------------------------
  */

  async saveReply(id, remarks) {
    const appointment = await repository.findById(id);

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    return await repository.saveReply(id, remarks);
  }

  /*
  |--------------------------------------------------------------------------
  | Dashboard Statistics
  |--------------------------------------------------------------------------
  */

  async getStatistics() {
    return await repository.getStatistics();
  }

  /*
  |--------------------------------------------------------------------------
  | Today's Appointments
  |--------------------------------------------------------------------------
  */

  async getTodayAppointments() {
    return await repository.getTodayAppointments();
  }
}

module.exports = new AppointmentService();
