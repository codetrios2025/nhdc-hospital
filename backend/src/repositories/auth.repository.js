const Admin = require("../models/Admin");

class AuthRepository {
  async findByEmail(email) {
    return Admin.findOne({
      email,

      isDeleted: false,
    }).select("+password");
  }

  async updateLastLogin(id) {
    return Admin.findByIdAndUpdate(
      id,

      {
        lastLogin: new Date(),
      },
    );
  }
}

module.exports = new AuthRepository();
