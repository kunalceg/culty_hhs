var express = require("express");
var controller = require("../controllers/training.controller.js");
var router = express.Router();
var multer = require("multer");

router.get("/cultyvatehhstraining", controller.cultyvatehhstraining);

module.exports = router;
