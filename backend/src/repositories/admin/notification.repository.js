const NotificationLog = require("../../models/NotificationLog");

class NotificationRepository {
  async create(data) {
    return NotificationLog.create(data);
  }

  async update(id, data) {
    return NotificationLog.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async findPending() {
    return NotificationLog.find({
      status: "Pending",
    });
  }

  async findFailed() {
    return NotificationLog.find({
      status: "Failed",
    });
  }

  async statistics() {
    const [total, sent, failed, pending] = await Promise.all([
      NotificationLog.countDocuments(),

      NotificationLog.countDocuments({
        status: "Sent",
      }),

      NotificationLog.countDocuments({
        status: "Failed",
      }),

      NotificationLog.countDocuments({
        status: "Pending",
      }),
    ]);

    return {
      total,
      sent,
      failed,
      pending,
    };
  }

  /*
|--------------------------------------------------------------------------
| Retry Failed
|--------------------------------------------------------------------------
*/

  async findRetryable(limit = 20) {
    return NotificationLog.find({
      status: "Failed",

      retryCount: {
        $lt: 5,
      },
    }).limit(limit);
  }
}

module.exports = new NotificationRepository();
