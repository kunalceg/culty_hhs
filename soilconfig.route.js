
var express = require("express");
var controller = require("../controllers/soilconfig.controller");
var router = express.Router();
var multer = require("multer");

router.post("/cultyvatehhssoilconfig", controller.cultyvatehhssoilconfig);

module.exports = router;
