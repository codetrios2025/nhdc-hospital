const Admin = require("../models/Admin");

class AuthRepository {
  /**
   * =====================================================
   * FIND ADMIN BY EMAIL
   * =====================================================
   */
  async findByEmail(email) {
    return Admin.findOne({
      email: email.toLowerCase().trim(),
      isDeleted: false,
    }).select("+password");
  }

  /**
   * =====================================================
   * FIND ADMIN BY ID
   * =====================================================
   *
   * Used by Change Password.
   *
   * We explicitly select password because the Admin
   * model may have password: { select: false }.
   */
  async findById(id) {
    return Admin.findOne({
      _id: id,
      isDeleted: false,
    }).select("+password");
  }

  /**
   * =====================================================
   * UPDATE LAST LOGIN
   * =====================================================
   */
  async updateLastLogin(id) {
    return Admin.findByIdAndUpdate(
      id,
      {
        lastLogin: new Date(),
      },
      {
        new: true,
      },
    );
  }

  /**
   * =====================================================
   * SAVE RESET PASSWORD TOKEN
   * =====================================================
   *
   * The token passed here should already be hashed.
   */
  async saveResetPasswordToken(adminId, token, expires) {
    return Admin.findByIdAndUpdate(
      adminId,
      {
        resetPasswordToken: token,
        resetPasswordExpires: expires,
      },
      {
        new: true,
      },
    );
  }

  /**
   * =====================================================
   * FIND ADMIN BY RESET PASSWORD TOKEN
   * =====================================================
   *
   * Only returns an admin if:
   *
   * 1. Token matches
   * 2. Token has not expired
   */
  async findByResetPasswordToken(token) {
    return Admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: new Date(),
      },
      isDeleted: false,
    });
  }

  /**
   * =====================================================
   * UPDATE ADMIN PASSWORD
   * =====================================================
   *
   * Also removes the reset token so the same reset
   * link cannot be reused.
   */
  async updatePassword(adminId, password) {
    return Admin.findByIdAndUpdate(
      adminId,
      {
        password,
        passwordChangedAt: new Date(),
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        new: true,
      },
    );
  }
}

module.exports = new AuthRepository();
