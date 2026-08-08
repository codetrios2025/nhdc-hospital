const NotificationManager = require("../NotificationManager");

const patientBookedTemplate = require("../templates/appointment/patientBooked");
const hospitalBookedTemplate = require("../templates/appointment/hospitalBooked");

const confirmedTemplate = require("../templates/appointment/confirmed");
const cancelledTemplate = require("../templates/appointment/cancelled");
const remarkTemplate = require("../templates/appointment/remark");

const { MODULES, EVENTS } = require("../constants");

class AppointmentNotification {
  /**
   * Appointment Booked
   */
  async booked(appointment) {
    const tasks = [];

    /*
    |--------------------------------------------------------------------------
    | Patient Email
    |--------------------------------------------------------------------------
    */

    if (appointment.email) {
      const patientTemplate = patientBookedTemplate(appointment);

      tasks.push(
        NotificationManager.sendEmail({
          module: MODULES.APPOINTMENT,
          event: EVENTS.APPOINTMENT_BOOKED,

          to: appointment.email,

          subject: patientTemplate.subject,

          html: patientTemplate.html,

          message: "Appointment booked successfully.",

          payload: appointment,
        }),
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Hospital Email
    |--------------------------------------------------------------------------
    */

    const hospitalTemplate = hospitalBookedTemplate(appointment);

    tasks.push(
      NotificationManager.sendEmail({
        module: "APPOINTMENT",

        event: "NEW_APPOINTMENT",

        to: process.env.HOSPITAL_EMAIL,

        subject: hospitalTemplate.subject,

        html: hospitalTemplate.html,

        message: "New appointment received.",

        payload: appointment,
      }),
    );

    return Promise.all(tasks);
  }

  /**
   * Appointment Confirmed
   */
  async confirmed(appointment) {
    if (!appointment.email) return;

    const template = confirmedTemplate(appointment);

    return NotificationManager.sendEmail({
      module: "APPOINTMENT",

      event: "APPOINTMENT_CONFIRMED",

      to: appointment.email,

      subject: template.subject,

      html: template.html,

      message: "Appointment confirmed.",

      payload: appointment,
    });
  }

  /**
   * Appointment Cancelled
   */
  async cancelled(appointment) {
    if (!appointment.email) return;

    const template = cancelledTemplate(appointment);

    return NotificationManager.sendEmail({
      module: "APPOINTMENT",

      event: "APPOINTMENT_CANCELLED",

      to: appointment.email,

      subject: template.subject,

      html: template.html,

      message: "Appointment cancelled.",

      payload: appointment,
    });
  }

  /**
   * Admin Remark
   */
  async remark(appointment, remarks) {
    if (!appointment.email) return;

    const template = remarkTemplate(appointment, remarks);

    return NotificationManager.sendEmail({
      module: "APPOINTMENT",

      event: "APPOINTMENT_REMARK",

      to: appointment.email,

      subject: template.subject,

      html: template.html,

      message: remarks,

      payload: appointment,
    });
  }
}

module.exports = new AppointmentNotification();
