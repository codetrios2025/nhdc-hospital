const AuthRepository = require("../repositories/auth.repository");
const ApiError = require("../utils/ApiError");
const generateToken = require("../utils/generateToken");

class AuthService {
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
}

module.exports = new AuthService();
