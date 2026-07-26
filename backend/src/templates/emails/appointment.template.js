class AppointmentTemplate {
  /*
  |--------------------------------------------------------------------------
  | User Confirmation Email
  |--------------------------------------------------------------------------
  */

  user(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>

      <body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:30px;">

        <div style="max-width:650px;background:#fff;margin:auto;padding:30px;border-radius:10px;">

          <h2 style="color:#0d6efd;">
            Appointment Request Received
          </h2>

          <p>
            Dear <strong>${data.patientName}</strong>,
          </p>

          <p>
            Thank you for booking your appointment with
            <strong>Namokar Hospital & Diagnostic Centre.</strong>
          </p>

          <table
            width="100%"
            cellpadding="8"
            cellspacing="0"
            border="1"
            style="border-collapse:collapse;"
          >

            <tr>
              <td><strong>Appointment Date</strong></td>
              <td>${data.appointmentDate}</td>
            </tr>

            <tr>
              <td><strong>Department</strong></td>
              <td>${data.department?.name || "-"}</td>
            </tr>

          </table>

          <p style="margin-top:20px;">
            Our team will contact you shortly.
          </p>

          <p>
            Regards,<br>
            <strong>Namokar Hospital & Diagnostic Centre</strong>
          </p>

        </div>

      </body>
      </html>
    `;
  }

  /*
  |--------------------------------------------------------------------------
  | Admin Notification
  |--------------------------------------------------------------------------
  */

  admin(data) {
    return `
      <!DOCTYPE html>

      <html>

      <body style="font-family:Arial;">

      <h2>New Appointment</h2>

      <table
      border="1"
      cellpadding="8"
      cellspacing="0"
      style="border-collapse:collapse;">

      <tr>

      <td>Patient</td>

      <td>${data.patientName}</td>

      </tr>

      <tr>

      <td>Mobile</td>

      <td>${data.mobile}</td>

      </tr>

      <tr>

      <td>Email</td>

      <td>${data.email || "-"}</td>

      </tr>

      <tr>

      <td>Date</td>

      <td>${data.appointmentDate}</td>

      </tr>

      <tr>

      <td>Department</td>

      <td>${data.department?.name || "-"}</td>

      </tr>

      <tr>

      <td>Reason</td>

      <td>${data.reason || "-"}</td>

      </tr>

      </table>

      </body>

      </html>
    `;
  }
}

module.exports = new AppointmentTemplate();
