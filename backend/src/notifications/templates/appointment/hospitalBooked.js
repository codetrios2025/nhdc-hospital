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
<td style="background:#f8f9fa;font-weight:bold;">
Gender
</td>

<td>
${appointment.gender || "-"}
</td>
</tr>

<tr>
<td class="label">
Age
</td>

<td>
${appointment.age || "-"}
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
${appointment.appointmentDate || appointment.preferredDate || "-"}
</td>

</tr>



<tr>

<td class="label">
Message
</td>

<td>
${appointment.message || appointment.reason || "-"}
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
