const layout = require("./layout");
const {
  formatAppointmentDate,
  formatAppointmentTime,
} = require("./formatters");

module.exports = (appointment = {}, remarks = "") => {
  const appointmentDate = formatAppointmentDate(appointment.appointmentDate);

  const appointmentTime = formatAppointmentTime(appointment.appointmentTime);
  const content = `

<p>
  Dear <strong>${appointment.patientName || "Patient"}</strong>,
</p>

<p>
  Our hospital team has added a remark regarding your appointment.
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
    ${appointmentTime}
  </td>
</tr>
`
    : ""
}

<tr>
  <td style="background:#f8f9fa;font-weight:bold;">
    Hospital Remark
  </td>

  <td>
    ${remarks || "-"}
  </td>
</tr>

</table>

<p style="margin-top:25px;">
  If you have any questions, please contact
  Namokar Hospital & Diagnostic Centre.
</p>

<p>
  Regards,<br>
  <strong>Namokar Hospital & Diagnostic Centre</strong>
</p>

`;

  return {
    subject: "Appointment Remark - Namokar Hospital",
    html: layout("Appointment Remark", content),
  };
};
