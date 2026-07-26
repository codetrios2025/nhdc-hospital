const express = require("express");

const router = express.Router();

const AuthController = require("../../controllers/auth.controller");

const verifyToken = require("../../middlewares/verifyToken");

const { loginValidation } = require("../../validations/auth.validation");

router.post("/login", loginValidation, AuthController.login);

// NEW
router.get("/profile", verifyToken, AuthController.profile);

// NEW
router.post("/logout", verifyToken, AuthController.logout);

module.exports = router;
