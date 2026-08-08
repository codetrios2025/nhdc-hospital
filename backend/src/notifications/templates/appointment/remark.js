const emailLayout = require("../common/emailLayout");
const appointmentTable = require("../common/appointmentTable");

module.exports = (appointment, remarks = "") => {
  return {
    subject: "Important Update Regarding Your Appointment",

    html: emailLayout({
      title: "Hospital Message",

      heading: `Dear ${appointment.patientName},`,

      content: `
        <p>
          Our hospital team has shared an important message regarding your appointment.
        </p>

        <div
          style="
            margin:25px 0;
            padding:18px;
            background:#fff8e5;
            border-left:5px solid #ffc107;
            border-radius:4px;
            color:#664d03;
          "
        >
          <strong>Hospital Remark</strong>

          <br><br>

          ${remarks || "-"}
        </div>

        ${appointmentTable(appointment)}

        <p style="margin-top:25px;">
          If you have any questions, please contact us.
        </p>

        <p>
          Regards,<br>
          <strong>Namokar Hospital & Diagnostic Centre</strong>
        </p>
      `,
    }),
  };
};
