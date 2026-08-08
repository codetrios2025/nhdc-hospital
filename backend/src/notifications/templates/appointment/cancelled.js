const emailLayout = require("../common/emailLayout");
const appointmentTable = require("../common/appointmentTable");

module.exports = (appointment) => {
  return {
    subject: "Appointment Cancelled",

    html: emailLayout({
      title: "Appointment Cancelled",

      heading: `Dear ${appointment.patientName},`,

      content: `
        <p>
          We regret to inform you that your appointment has been cancelled.
        </p>

        <p>
          Please contact our hospital to reschedule your appointment at your convenience.
        </p>

        ${appointmentTable(appointment)}

        <div
          style="
            margin-top:25px;
            padding:15px;
            background:#fdeaea;
            border-left:5px solid #dc3545;
            color:#842029;
          "
        >
          <strong>Need Assistance?</strong><br>

          Phone : ${process.env.HOSPITAL_PHONE || "-"}<br>

          Email : ${process.env.HOSPITAL_EMAIL || "-"}
        </div>

        <p style="margin-top:25px;">
          We apologize for any inconvenience caused and appreciate your understanding.
        </p>

        <p>
          Regards,<br>
          <strong>Namokar Hospital & Diagnostic Centre</strong>
        </p>
      `,
    }),
  };
};
