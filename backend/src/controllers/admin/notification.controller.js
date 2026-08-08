const NotificationService = require("../../services/admin/notification.service");

class NotificationController {
  async testEmail(req, res, next) {
    try {
      const result = await NotificationService.testEmail({
        to: req.body.to,
      });

      return res.status(200).json({
        success: result.success,
        message: result.success
          ? "Test email sent successfully."
          : "Unable to send test email.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NotificationController();
