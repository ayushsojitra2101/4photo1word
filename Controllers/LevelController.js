const Level = require("../Models/Level");

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
exports.getOneLevel = async function (req, res, next) {
  try {
    let LevelData = await Level.findById(req.params.id);
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
exports.getAllLevel = async function (req, res, next) {
  try {
    let LevelData = await Level.find();
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
