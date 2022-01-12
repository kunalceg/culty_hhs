var express = require("express");
var controller = require("../controllers/soilc.controller.js");
var router = express.Router();
var multer = require("multer");

router.get("/cultyvatehhssoilc", controller.cultyvatehhssoilc);

module.exports = router;
