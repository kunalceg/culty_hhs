var express = require("express");
var controller = require("../controllers/farmreg.controller.js");
var router = express.Router();
var multer = require("multer");

router.get("/cultyvatehhsfarmreg", controller.cultyvatehhsfarmreg);

module.exports = router;
