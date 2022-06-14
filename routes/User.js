var express = require('express');
var router = express.Router();
var AuthController = require('../Controllers/AuthController');
var CoinController = require('../Controllers/Coin');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', AuthController.protectGlobal, AuthController.login);
router.post('/signup', AuthController.protectGlobal, AuthController.signUp);
router.get('/coin', AuthController.protectGlobal,AuthController.protect, CoinController.coin);

module.exports = router;