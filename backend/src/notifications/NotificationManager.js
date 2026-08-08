const EmailService = require("./email/EmailService");

class NotificationManager {
  /**
   * Generic Email Sender
   */
  async sendEmail(options = {}) {
    return EmailService.send(options);
  }
}

module.exports = new NotificationManager();
