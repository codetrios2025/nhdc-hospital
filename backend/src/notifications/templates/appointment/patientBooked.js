const layout = require("../common/emailLayout");
const appointmentTable = require("../common/appointmentTable");

module.exports = (appointment) => ({
  subject: "Appointment Request Received",

  html: layout({
    title: "Appointment Request",

    heading: `Dear ${appointment.patientName},`,

    content: `
            <p>
            Thank you for choosing
            <strong>Namokar Hospital</strong>.
            </p>

            <p>
            Your appointment request has been received.
            </p>

            ${appointmentTable(appointment)}

            <p>
            Our team will contact you shortly.
            </p>
        `,
  }),
});
