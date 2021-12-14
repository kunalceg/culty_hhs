var express = require("express");
var controller = require("../controllers/aboutusinfo.controller.js");
var router = express.Router();
var multer = require("multer");

router.get("/cultyvatehhsaboutusinfo", controller.cultyvatehhsaboutusinfo);

module.exports = router;
