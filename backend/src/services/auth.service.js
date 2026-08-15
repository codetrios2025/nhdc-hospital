const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const AuthRepository = require("../repositories/auth.repository");
const ApiError = require("../utils/ApiError");
const generateToken = require("../utils/generateToken");

const { sendPasswordResetEmail } = require("../utils/email.service");

class AuthService {
  /**
   * =====================================================
   * LOGIN
   * =====================================================
   */
  async login(payload) {
    const { email, password } = payload;

    const admin = await AuthRepository.findByEmail(email);

    if (!admin) {
      throw new ApiError(401, "Invalid email or password");
    }

    if (!admin.isActive) {
      throw new ApiError(403, "Your account has been disabled");
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    await AuthRepository.updateLastLogin(admin._id);

    const token = generateToken({
      id: admin._id,
      role: admin.role,
      email: admin.email,
    });

    return {
      token,

      user: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
        profileImage: admin.profileImage,
      },
    };
  }

  /**
   * =====================================================
   * FORGOT PASSWORD
   * =====================================================
   */
  async forgotPasswordold(email) {
    if (!email) {
      throw new ApiError(400, "Email is required");
    }

    const normalizedEmail = email.toLowerCase().trim();

    const admin = await AuthRepository.findByEmail(normalizedEmail);

    /*
     * Do not reveal whether the email exists.
     *
     * This prevents attackers from discovering
     * registered admin email addresses.
     */
    if (!admin) {
      return;
    }

    /*
     * Generate a cryptographically secure
     * random token.
     *
     * This RAW token is sent to the user.
     */
    const rawToken = crypto.randomBytes(32).toString("hex");

    /*
     * Hash the token before storing it
     * in MongoDB.
     */
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    /*
     * Token expires after 30 minutes.
     */
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    /*
     * Save hashed token and expiry.
     */
    await AuthRepository.saveResetPasswordToken(
      admin._id,
      hashedToken,
      expiresAt,
    );

    /*
     * Reset URL sent to the frontend.
     *
     * Example:
     *
     * http://localhost:5173/reset-password/abc123
     */
    const frontendUrl =
      process.env.ADMIN_FRONTEND_URL || "http://localhost:5173";

    const resetUrl = `${frontendUrl}/reset-password/${rawToken}`;

    /*
     * Send email.
     */
    console.log("==========================================");

    console.log("FORGOT PASSWORD EMAIL");

    console.log("Recipient:", admin.email);

    console.log("Admin ID:", admin._id);

    console.log("Frontend URL:", process.env.ADMIN_FRONTEND_URL);

    console.log("Reset URL:", resetUrl);

    console.log("MAIL_HOST:", process.env.MAIL_HOST);

    console.log("MAIL_PORT:", process.env.MAIL_PORT);

    console.log("MAIL_SECURE:", process.env.MAIL_SECURE);

    console.log("MAIL_USER:", process.env.MAIL_USER);

    console.log("MAIL_PASSWORD configured:", !!process.env.MAIL_PASSWORD);

    console.log("==========================================");

    await sendPasswordResetEmail({
      email: admin.email,
      name:
        admin.fullName ||
        `${admin.firstName || ""} ${admin.lastName || ""}`.trim() ||
        "Admin",
      resetUrl,
    });
  }

  /**
   * =====================================================
   * FORGOT PASSWORD
   * =====================================================
   */
  async forgotPassword(email) {
    console.log("==========================================");

    console.log("FORGOT PASSWORD REQUEST");

    console.log("Email received:", email);

    if (!email) {
      throw new ApiError(400, "Email is required");
    }

    const normalizedEmail = email.toLowerCase().trim();

    console.log("Normalized email:", normalizedEmail);

    /**
     * Find admin
     */
    const admin = await AuthRepository.findByEmail(normalizedEmail);

    console.log("Admin found:", !!admin);

    if (admin) {
      console.log("Admin ID:", admin._id);

      console.log("Admin email:", admin.email);

      console.log("Admin isActive:", admin.isActive);

      console.log("Admin isDeleted:", admin.isDeleted);
    }

    /*
     * Do not reveal whether an email exists.
     */
    if (!admin) {
      console.log("No admin found. Returning without sending email.");

      console.log("==========================================");

      return;
    }

    /**
     * Generate secure reset token
     */
    const rawToken = crypto.randomBytes(32).toString("hex");

    console.log("Reset token generated successfully");

    /**
     * Hash token before storing
     */
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    /**
     * Token expires after 30 minutes
     */
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    console.log("Reset token expiry:", expiresAt);

    /**
     * Save reset token
     */
    await AuthRepository.saveResetPasswordToken(
      admin._id,
      hashedToken,
      expiresAt,
    );

    console.log("Reset token saved to database");

    /**
     * Create reset URL
     */
    const frontendUrl =
      process.env.ADMIN_FRONTEND_URL || "http://localhost:5173";

    const resetUrl = `${frontendUrl}/reset-password/${rawToken}`;

    /**
     * Send email
     */

    const emailResult = await sendPasswordResetEmail({
      email: admin.email,
      name:
        admin.fullName ||
        `${admin.firstName || ""} ${admin.lastName || ""}`.trim() ||
        "Admin",
      resetUrl,
    });
  }

  /**
   * =====================================================
   * RESET PASSWORD
   * =====================================================
   */
  async resetPassword(rawToken, newPassword) {
    if (!rawToken) {
      throw new ApiError(400, "Reset token is required");
    }

    if (!newPassword) {
      throw new ApiError(400, "New password is required");
    }

    /*
     * Password validation
     *
     * Minimum:
     * 8 characters
     * 1 lowercase
     * 1 uppercase
     * 1 number
     * 1 special character
     */
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      throw new ApiError(
        400,
        "Password must contain at least 8 characters, including uppercase, lowercase, number and special character",
      );
    }

    /*
     * Hash the token received from the
     * reset-password URL.
     */
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    /*
     * Find admin using:
     *
     * 1. hashed reset token
     * 2. token expiry
     */
    const admin = await AuthRepository.findByResetPasswordToken(hashedToken);

    if (!admin) {
      throw new ApiError(400, "Invalid or expired password reset link");
    }

    /*
     * Hash the new password.
     */
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    /*
     * Update password and clear
     * reset token.
     */
    await AuthRepository.updatePassword(admin._id, hashedPassword);
  }

  /**
   * =====================================================
   * CHANGE PASSWORD
   * =====================================================
   */
  async changePassword(adminId, currentPassword, newPassword) {
    if (!adminId) {
      throw new ApiError(401, "Unauthorized");
    }

    if (!currentPassword || !newPassword) {
      throw new ApiError(400, "Current password and new password are required");
    }

    /*
     * Password validation
     */
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      throw new ApiError(
        400,
        "New password must contain at least 8 characters, including uppercase, lowercase, number and special character",
      );
    }

    /*
     * Get current admin.
     */
    const admin = await AuthRepository.findById(adminId);

    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }

    /*
     * Check current password.
     */
    const isCurrentPasswordValid = await admin.comparePassword(currentPassword);

    if (!isCurrentPasswordValid) {
      throw new ApiError(400, "Current password is incorrect");
    }

    /*
     * Prevent user from setting the
     * same password again.
     */
    const isSamePassword = await bcrypt.compare(newPassword, admin.password);

    if (isSamePassword) {
      throw new ApiError(
        400,
        "New password must be different from current password",
      );
    }

    /*
     * Hash new password.
     */
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    /*
     * Update password.
     */
    await AuthRepository.updatePassword(admin._id, hashedPassword);
  }
}

module.exports = new AuthService();
