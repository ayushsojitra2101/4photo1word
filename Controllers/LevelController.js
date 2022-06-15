const Level = require("../models/Level");

exports.addLevel = async function (req, res, next) {
  try {
    let LevelData = await Level.create(req.body);
    res.status(200).json({
      status: "200",
      message: "success",
      LevelData,
    });
  } catch (err) {
    res.status(400).json({
      status: "500",
      message: err.message,
    });
  }
};
