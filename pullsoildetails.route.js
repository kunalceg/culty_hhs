
var express = require("express");
var controller = require("../controllers/pullsoildetails.controller.js");
var router = express.Router();
var multer = require("multer");

router.post("/cultyvatehhspullsoildetails", controller.cultyvatehhspullsoildetails);

module.exports = router;
