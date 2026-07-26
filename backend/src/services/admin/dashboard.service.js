const dashboardRepository = require("../../repositories/admin/dashboard.repository");

console.log("dashboardRepository =", dashboardRepository);
console.log("typeof =", typeof dashboardRepository);
console.log("getSummary =", dashboardRepository.getSummary);
console.log(
  "prototype =",
  Object.getOwnPropertyNames(Object.getPrototypeOf(dashboardRepository)),
);

class DashboardService {
  async getDashboardSummary() {
    console.log("Inside getDashboardSummary()");
    return await dashboardRepository.getSummary();
  }
}

module.exports = new DashboardService();
