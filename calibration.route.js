
var express = require("express");
var controller = require("../controllers/calibration.controller.js");
var router = express.Router();
var multer = require("multer");

router.post("/cultyvatehhscalibration", controller.cultyvatehhscalibration);

module.exports = router;
