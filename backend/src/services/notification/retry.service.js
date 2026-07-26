const NotificationRepository = require("../../repositories/admin/notification.repository");

class RetryService {
  async retryFailed() {
    const logs = await NotificationRepository.findRetryable();

    for (const log of logs) {
      console.log(
        "Retry",

        log.channel,

        log.recipient,
      );

      /*
            Re-dispatch

            Email

            WhatsApp

            SMS

            */
    }
  }
}

module.exports = new RetryService();
