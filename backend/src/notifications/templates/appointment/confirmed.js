const layout = require("../common/emailLayout");
const appointmentTable = require("../common/appointmentTable");

module.exports = (appointment) => ({
  subject: "Appointment Confirmed",

  html: layout({
    title: "Appointment Confirmed",

    heading: `Dear ${appointment.patientName},`,

    content: `
            <p>
            Your appointment has been confirmed.
            </p>

            ${appointmentTable(appointment)}

            <p>
            Please arrive 15 minutes before your scheduled time.
            </p>
        `,
  }),
});
