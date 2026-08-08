const NotificationManager = require("../../notifications/NotificationManager");

class NotificationService {
  /**
   * SMTP Test Email
   */
  async testEmail(data = {}) {
    const result = await NotificationManager.sendEmail({
      module: "GENERAL",

      event: "SMTP_TEST",

      to: data.to,

      subject: "NHDC Notification Test",

      html: `
        <div style="font-family:Arial,sans-serif">

          <h2 style="color:#0d6efd">
            SMTP Configuration Successful
          </h2>

          <p>
            Congratulations!
          </p>

          <p>
            Your Notification Module is configured correctly.
          </p>

          <p>
            This is a test email generated from
            <strong>Namokar Hospital & Diagnostic Centre</strong>.
          </p>

          <hr>

          <p>
            Time :
            ${new Date().toLocaleString()}
          </p>

        </div>
      `,

      message: "SMTP Test",

      payload: {},
    });

    return result;
  }
}

module.exports = new NotificationService();
