const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

module.exports = async (req, res, next) => {
  try {
    /**
     * ============================================
     * GET AUTHORIZATION HEADER
     * ============================================
     */
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }

    /**
     * ============================================
     * CHECK BEARER TOKEN FORMAT
     * ============================================
     *
     * Expected:
     *
     * Authorization: Bearer eyJhbGciOi...
     */
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    /**
     * ============================================
     * EXTRACT TOKEN
     * ============================================
     */
    const token = authHeader.substring(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is required",
      });
    }

    /**
     * ============================================
     * VERIFY JWT
     * ============================================
     */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /**
     * ============================================
     * FIND ADMIN
     * ============================================
     *
     * We don't simply trust the JWT.
     *
     * We verify that the admin still exists
     * in the database.
     */
    const admin = await Admin.findOne({
      _id: decoded.id,
      isDeleted: false,
    }).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    /**
     * ============================================
     * CHECK ACTIVE STATUS
     * ============================================
     */
    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been disabled",
      });
    }

    /**
     * ============================================
     * ATTACH ADMIN TO REQUEST
     * ============================================
     *
     * IMPORTANT:
     *
     * req.user is the MongoDB Admin document.
     */
    req.user = admin;

    next();
  } catch (error) {
    console.error("Verify Token Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
