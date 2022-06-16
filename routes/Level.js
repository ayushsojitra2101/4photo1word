var express = require("express");
var router = express.Router();
var AuthController = require("../Controllers/AuthController");
var LevelController = require("../Controllers/LevelController");

router.post("/", AuthController.protectGlobal,AuthController.protect, LevelController.addLevel);
router.get("/", AuthController.protectGlobal,AuthController.protect, LevelController.getAllLevel);
router.get("/:id", AuthController.protectGlobal,AuthController.protect, LevelController.getOneLevel);

module.exports = router;
