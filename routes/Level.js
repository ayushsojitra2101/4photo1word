var express = require("express");
var router = express.Router();
var AuthController = require("../Controllers/AuthController");
var LevelController = require("../Controllers/LevelController");

router.post("/", AuthController.protectGlobal, LevelController.addLevel);

module.exports = router;
