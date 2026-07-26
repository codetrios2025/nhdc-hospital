const EmailService = require("./email.service");
const WhatsappService = require("./whatsapp.service");

const AppointmentTemplate = require("../../templates/emails/appointment.template");
const WhatsappTemplate = require("../../templates/whatsapp/appointment.template");

const NotificationRepository = require("../../repositories/admin/notification.repository");

const NotificationQueue = require("./notification.queue");

class NotificationService {
  /*
  |--------------------------------------------------------------------------
  | Appointment Created
  |--------------------------------------------------------------------------
  */

  async appointmentCreated(appointment) {
    await NotificationQueue.add({
      handler: async () => {
        await this.sendAppointmentToUser(appointment);
      },
    });

    await NotificationQueue.add({
      handler: async () => {
        await this.sendAppointmentToAdmin(appointment);
      },
    });

    await NotificationQueue.add({
      handler: async () => {
        await this.sendAppointmentToAdminWhatsapp(appointment);
      },
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Create Notification Log
  |--------------------------------------------------------------------------
  */

  async createLog(data) {
    return await NotificationRepository.create(data);
  }

  /*
  |--------------------------------------------------------------------------
  | User Email
  |--------------------------------------------------------------------------
  */

  async sendAppointmentToUser(appointment) {
    if (!appointment.email) return;

    const log = await this.createLog({
      channel: "Email",
      event: "Appointment Created",
      recipient: appointment.email,
      subject: "Appointment Request Received",
      status: "Pending",
      provider: "SMTP",
    });

    try {
      const response = await EmailService.send({
        to: appointment.email,
        subject: "Appointment Request Received",
        html: AppointmentTemplate.user(appointment),
      });

      await NotificationRepository.update(log._id, {
        status: "Sent",
        response,
        sentAt: new Date(),
      });

      return response;
    } catch (error) {
      await NotificationRepository.update(log._id, {
        status: "Failed",
        error: error.message,
        retryCount: 1,
      });

      console.error("User Email Error:", error.message);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Admin Email
  |--------------------------------------------------------------------------
  */

  async sendAppointmentToAdmin(appointment) {
    const log = await this.createLog({
      channel: "Email",
      event: "Appointment Created",
      recipient: process.env.ADMIN_EMAIL,
      subject: "New Appointment Received",
      status: "Pending",
      provider: "SMTP",
    });

    try {
      const response = await EmailService.send({
        to: process.env.ADMIN_EMAIL,
        subject: "New Appointment Received",
        html: AppointmentTemplate.admin(appointment),
      });

      await NotificationRepository.update(log._id, {
        status: "Sent",
        response,
        sentAt: new Date(),
      });

      return response;
    } catch (error) {
      await NotificationRepository.update(log._id, {
        status: "Failed",
        error: error.message,
        retryCount: 1,
      });

      console.error("Admin Email Error:", error.message);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Admin WhatsApp
  |--------------------------------------------------------------------------
  */

  async sendAppointmentToAdminWhatsapp(appointment) {
    if (!process.env.ADMIN_WHATSAPP) return;

    const log = await this.createLog({
      channel: "WhatsApp",
      event: "Appointment Created",
      recipient: process.env.ADMIN_WHATSAPP,
      subject: "New Appointment",
      status: "Pending",
      provider: process.env.WHATSAPP_PROVIDER || "Meta",
    });

    try {
      const response = await WhatsappService.send({
        to: process.env.ADMIN_WHATSAPP,
        message: WhatsappTemplate.admin(appointment),
      });

      await NotificationRepository.update(log._id, {
        status: "Sent",
        response,
        sentAt: new Date(),
      });

      return response;
    } catch (error) {
      await NotificationRepository.update(log._id, {
        status: "Failed",
        error: error.message,
        retryCount: 1,
      });

      console.error("WhatsApp Error:", error.message);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Appointment Confirmed
  |--------------------------------------------------------------------------
  */

  async appointmentConfirmed(appointment) {
    // Batch 1.10
  }

  /*
  |--------------------------------------------------------------------------
  | Appointment Cancelled
  |--------------------------------------------------------------------------
  */

  async appointmentCancelled(appointment) {
    // Batch 1.10
  }

  /*
  |--------------------------------------------------------------------------
  | Appointment Completed
  |--------------------------------------------------------------------------
  */

  async appointmentCompleted(appointment) {
    // Batch 1.10
  }
}

module.exports = new NotificationService();
