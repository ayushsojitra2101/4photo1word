var express = require("express");
var router = express.Router();
const AuthController = require("../Controllers/AuthController");

router.get("/coin",AuthController.protect);
router.get("/package",AuthController.protect);

module.exports = router;
