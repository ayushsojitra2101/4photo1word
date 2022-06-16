const Package = require("../Models/Package");

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
    let PackageCnt = await Package.find();
    let cnt = PackageCnt.length / 10;
    let PackageData = await Package.find({}, { package: 1 })
      .limit(10)
      .skip(10 * (req.params.page - 1));
    res.status(200).json({
      status: "200",
      message: "success",
      PackageData,
      totalpages: Math.ceil(cnt),
    });
  } catch (err) {
    res.status(400).json({
      status: "500",
      message: err.message,
    });
  }
};
exports.getOnePackage = async function (req, res, next) {
  try {
    let id = req.params.id;
    console.log(id);
    let PackageData = await Package.findById(id).populate("levels");
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
