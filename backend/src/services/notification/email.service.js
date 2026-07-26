const transporter = require("../../utils/mailer");

class EmailService {
  async send({ to, subject, html, cc = [], bcc = [], attachments = [] }) {
    return transporter.sendMail({
      from: process.env.MAIL_FROM,

      to,

      cc,

      bcc,

      subject,

      html,

      attachments,
    });
  }
}

module.exports = new EmailService();
