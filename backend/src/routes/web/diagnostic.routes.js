const express = require("express");

const DiagnosticController = require("../../controllers/admin/diagnostic.controller");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Website Diagnostic Routes
|--------------------------------------------------------------------------
*/

router.get("/", DiagnosticController.getPublicList);

router.get("/:id", DiagnosticController.getPublicById);

module.exports = router;
