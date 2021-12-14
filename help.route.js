var express = require("express");
var controller = require("../controllers/help.controller.js");
var router = express.Router();
var multer = require("multer");

router.get("/cultyvatehhshelp", controller.cultyvatehhshelp);

module.exports = router;
