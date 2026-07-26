const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/auth.controller");

const { loginValidation } = require("../validations/auth.validation");

router.post(
  "/login",

  loginValidation,

  AuthController.login,
);

module.exports = router;
