
var express = require("express");
var controller = require("../controllers/farmerdetails.controller");
var router = express.Router();
var multer = require("multer");

router.post("/cultyvatehhsfarmerdetails", controller.cultyvatehhsfarmerdetails);

module.exports = router;
