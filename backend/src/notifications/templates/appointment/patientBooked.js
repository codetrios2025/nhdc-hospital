const layout = require("./layout");
const {
  formatAppointmentDate,
  formatAppointmentTime,
} = require("./formatters");

module.exports = (appointment = {}) => {
  const appointmentDate = formatAppointmentDate(appointment.appointmentDate);

  const appointmentTime = formatAppointmentTime(appointment.appointmentTime);
  const content = `

<p>
  Dear <strong>${appointment.patientName || "Patient"}</strong>,
</p>

<p>
  Thank you for choosing
  <strong>Namokar Hospital & Diagnostic Centre</strong>.
</p>

<p>
  Your appointment request has been received successfully.
  Our hospital team will review your request and confirm the appointment.
</p>

<table
  cellpadding="8"
  cellspacing="0"
  width="100%"
  style="
    border-collapse:collapse;
    margin-top:20px;
    border:1px solid #dddddd;
  "
>

<tr>
  <td
    style="
      background:#f8f9fa;
      font-weight:bold;
      width:180px;
    "
  >
    Patient Name
  </td>

  <td>
    ${appointment.patientName || "-"}
  </td>
</tr>

<tr>
  <td
    style="
      background:#f8f9fa;
      font-weight:bold;
    "
  >
    Gender
  </td>

  <td>
    ${appointment.gender || "-"}
  </td>
</tr>

<tr>
  <td
    style="
      background:#f8f9fa;
      font-weight:bold;
    "
  >
    Age
  </td>

  <td>
    ${appointment.age || "-"}
  </td>
</tr>

<tr>
  <td
    style="
      background:#f8f9fa;
      font-weight:bold;
    "
  >
    Mobile
  </td>

  <td>
    ${appointment.mobile || "-"}
  </td>
</tr>

<tr>
  <td
    style="
      background:#f8f9fa;
      font-weight:bold;
    "
  >
    Email
  </td>

  <td>
    ${appointment.email || "-"}
  </td>
</tr>

<tr>
  <td
    style="
      background:#f8f9fa;
      font-weight:bold;
    "
  >
    Preferred Date
  </td>

  <td>
    ${appointmentDate || "-"}
  </td>
</tr>

${
  appointmentTime
    ? `
<tr>
  <td
    style="
      background:#f8f9fa;
      font-weight:bold;
    "
  >
    Appointment Time
  </td>

  <td>
    ${appointmentTime || "-"}
  </td>
</tr>
`
    : ""
}

<tr>
  <td
    style="
      background:#f8f9fa;
      font-weight:bold;
    "
  >
    Message
  </td>

  <td>
    ${appointment.message || appointment.reason || "-"}
  </td>
</tr>

</table>

<p style="margin-top:25px;">
  We will contact you once your appointment is confirmed.
</p>

<p>
  Regards,<br>
  <strong>Namokar Hospital & Diagnostic Centre</strong>
</p>

`;

  return {
    subject: "Appointment Booking Received - Namokar Hospital",
    html: layout("Appointment Booking Received", content),
  };
};
