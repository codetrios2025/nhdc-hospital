const emailLayout = require("../common/emailLayout");

module.exports = (appointment) => {
  return {
    subject: "New Appointment Booking",

    html: emailLayout({
      title: "New Appointment",

      heading: "A new appointment has been received.",

      content: `

<table>

<tr>

<td class="label">
Patient
</td>

<td>
${appointment.patientName}
</td>

</tr>

<tr>

<td class="label">
Mobile
</td>

<td>
${appointment.mobile}
</td>

</tr>

<tr>

<td class="label">
Email
</td>

<td>
${appointment.email}
</td>

</tr>

<tr>

<td class="label">
Preferred Date
</td>

<td>
${appointment.preferredDate}
</td>

</tr>

<tr>

<td class="label">
Department
</td>

<td>
${appointment.departmentName || "-"}
</td>

</tr>

<tr>

<td class="label">
Doctor
</td>

<td>
${appointment.doctorName || "-"}
</td>

</tr>

<tr>

<td class="label">
Message
</td>

<td>
${appointment.message || "-"}
</td>

</tr>

</table>

<p>

Please login to the Admin Panel.

</p>

`,
    }),
  };
};
