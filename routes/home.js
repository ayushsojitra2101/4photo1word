var express = require('express');
var router = express.Router();
var AuthController = require('../Controllers/AuthController');

router.get('/',AuthController.protectGlobal,function (req, res) {
        try {
          
          res.status(201).json({
            status: "success",
            message:"this req in not allowed",
            date: new Date("14 May 2022")
          });
        } catch (err) {
          res.status(404).json({
            status: "fail",
            message: err.message,
          });
        }
      });

module.exports = router;