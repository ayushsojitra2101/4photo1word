const Coin = require("../Models/Coin");

exports.coin = async function (req, res, next) {
  try {
        let userId = req.params.id;
        let coin = await Coin.find({userId});        
    res.status(200).json({
      status: "200",
      message: "success",
      coin
    });
  } catch (err) {
    res.status(400).json({
      status: "500",
      message: err.message,
    });
  }
};
