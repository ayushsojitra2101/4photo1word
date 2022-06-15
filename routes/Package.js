var express = require("express");
var router = express.Router();
var AuthController = require("../Controllers/AuthController");
var PackageController = require("../Controllers/PackageController");

router.get("/", AuthController.protectGlobal,PackageController.getPackage);
router.post("/", AuthController.protectGlobal,PackageController.addPackage);

module.exports = router;
