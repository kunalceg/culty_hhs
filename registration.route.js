
var express = require("express");
var controller = require("../controllers/registration.controller");
var router = express.Router();
var multer = require("multer");

router.post("/cultyvatehhsregistration", controller.cultyvatehhsregistration);

module.exports = router;
