var express = require("express");
var controller = require("../controllers/contactusinfo.controller.js");
var router = express.Router();
var multer = require("multer");

router.get("/cultyvatehhscontactusinfo", controller.cultyvatehhscontactusinfo);

module.exports = router;
