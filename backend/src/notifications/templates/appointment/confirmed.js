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
  We are pleased to inform you that your appointment at
  <strong>Namokar Hospital & Diagnostic Centre</strong>
  has been <strong style="color:#198754;">confirmed</strong>.
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
  <td style="background:#f8f9fa;font-weight:bold;width:180px;">
    Patient Name
  </td>

  <td>
    ${appointment.patientName || "-"}
  </td>
</tr>

<tr>
  <td style="background:#f8f9fa;font-weight:bold;">
    Mobile
  </td>

  <td>
    ${appointment.mobile || "-"}
  </td>
</tr>

<tr>
  <td style="background:#f8f9fa;font-weight:bold;">
    Appointment Date
  </td>

  <td>
    ${appointmentDate || "-"}
  </td>
</tr>

${
  appointmentTime
    ? `
<tr>
  <td style="background:#f8f9fa;font-weight:bold;">
    Appointment Time
  </td>

  <td>
    <strong>
       ${appointmentTime || "-"}
    </strong>
  </td>
</tr>
`
    : ""
}

</table>

<p style="margin-top:25px;">
  Please arrive at the hospital at least 15 minutes before
  your scheduled appointment.
</p>

<p>
  Regards,<br>
  <strong>Namokar Hospital & Diagnostic Centre</strong>
</p>

`;

  return {
    subject: "Appointment Confirmed - Namokar Hospital",
    html: layout("Appointment Confirmed", content),
  };
};
