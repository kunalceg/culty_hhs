var express = require("express");
var controller = require("../controllers/term.controller.js");
var router = express.Router();
var multer = require("multer");

router.get("/cultyvatehhsterm", controller.cultyvatehhsterm);

module.exports = router;
