const transporter = require("../config/transporter");
const notificationRepository = require("../../repositories/admin/notification.repository");
const { CHANNELS, STATUS, MODULES } = require("../constants");

class EmailService {
  /**
   * Send Email
   * @param {Object} options
   * @param {String} options.to
   * @param {String} options.subject
   * @param {String} options.html
   * @param {String} options.text
   * @param {Array} options.attachments
   * @param {String} options.module
   * @param {Object} options.payload
   */
  async send(options = {}) {
    let notificationLog = null;

    try {
      const {
        to,
        subject,
        html = "",
        text = "",
        attachments = [],
        module = MODULES.GENERAL,
        event,
        message = "",
        payload = {},
      } = options;

      if (!to) {
        throw new Error("Recipient email is required.");
      }

      // Create Notification Log
      notificationLog = await notificationRepository.create({
        module,

        event,

        channel: CHANNELS.EMAIL,

        recipient: to,

        subject,

        message,

        payload,

        status: STATUS.PENDING,

        retryCount: 0,
      });

      const mailOptions = {
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
        to,
        subject,
        text,
        html,
        attachments,
      };

      const result = await transporter.sendMail(mailOptions);

      // Update Log Success
      await notificationRepository.update(notificationLog._id, {
        status: STATUS.SENT,
        sentAt: new Date(),
        response: {
          messageId: result.messageId,
        },
      });

      return {
        success: true,
        response: {
          messageId: result.messageId,
        },
      };
    } catch (error) {
      console.error("Email Error:", error);

      if (notificationLog) {
        await notificationRepository.update(notificationLog._id, {
          status: STATUS.FAILED,
          error: error.message,
          $inc: {
            retryCount: 1,
          },
        });
      }

      return {
        success: false,
        message: error.message,
      };
    }
  }
}

module.exports = new EmailService();
