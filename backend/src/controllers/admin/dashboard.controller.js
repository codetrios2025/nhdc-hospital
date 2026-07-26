const dashboardService = require("../../services/admin/dashboard.service");

class DashboardController {
  async summary(req, res) {
    try {
      console.log("Controller Started");

      const data = await dashboardService.getDashboardSummary();

      console.log("Dashboard Data :", data);

      return res.json({
        success: true,

        data,
      });
    } catch (error) {
      console.error("========== DASHBOARD ERROR ==========");

      console.error(error);

      console.error(error.stack);

      return res.status(500).json({
        success: false,

        error: error.message,

        stack: error.stack,
      });
    }
  }
}

module.exports = new DashboardController();
