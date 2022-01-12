var express = require("express");
var controller = require("../controllers/farmerd.controller.js");
var router = express.Router();
var multer = require("multer");

router.get("/cultyvatehhsfarmerd", controller.cultyvatehhsfarmerd);

module.exports = router;
