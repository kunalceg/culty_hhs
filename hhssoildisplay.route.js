var express = require("express");
var controller = require("../controllers/hhssoildisplay.controller.js");
var router = express.Router();
var multer = require("multer");

router.post("/hhssoildisplay", controller.hhssoildisplay);

module.exports = router;