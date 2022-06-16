var express = require("express");
var router = express.Router();
var AuthController = require("../Controllers/AuthController");
var PackageController = require("../Controllers/PackageController");

router.get("/page/:page", AuthController.protectGlobal,AuthController.protect,PackageController.getPackage);
router.get("/:id", AuthController.protectGlobal,AuthController.protect,PackageController.getOnePackage);
router.post("/", AuthController.protectGlobal,AuthController.protect,PackageController.addPackage);

module.exports = router;
