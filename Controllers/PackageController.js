const Package = require("../models/Package");

exports.addPackage = async function (req, res, next) {
  try {
    let PackageData = await Package.create(req.body);
    res.status(200).json({
      status: "200",
      message: "success",
      PackageData,
    });
  } catch (err) {
    res.status(400).json({
      status: "500",
      message: err.message,
    });
  }
};
exports.getPackage = async function (req, res, next) {
  try {
    let Package = await Package.find();
    res.status(200).json({
      status: "200",
      message: "success",
      PackageData,
    });
  } catch (err) {
    res.status(400).json({
      status: "500",
      message: err.message,
    });
  }
};
