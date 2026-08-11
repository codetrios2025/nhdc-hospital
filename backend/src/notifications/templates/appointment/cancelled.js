const layout = require("./layout");

module.exports = (appointment = {}) => {
  const content = `

<p>
  Dear <strong>${appointment.patientName || "Patient"}</strong>,
</p>

<p>
  We regret to inform you that your appointment at
  <strong>Namokar Hospital & Diagnostic Centre</strong>
  has been
  <strong style="color:#dc3545;">cancelled</strong>.
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
    ${appointment.appointmentDate || "-"}
  </td>
</tr>

${
  appointment.appointmentTime
    ? `
<tr>
  <td style="background:#f8f9fa;font-weight:bold;">
    Appointment Time
  </td>

  <td>
    ${appointment.appointmentTime}
  </td>
</tr>
`
    : ""
}

</table>

<p style="margin-top:25px;">
  If you would like to schedule another appointment,
  please contact our hospital.
</p>

<p>
  Regards,<br>
  <strong>Namokar Hospital & Diagnostic Centre</strong>
</p>

`;

  return {
    subject: "Appointment Cancelled - Namokar Hospital",
    html: layout("Appointment Cancelled", content),
  };
};
