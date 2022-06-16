var express = require("express");
var router = express.Router();
var AuthController = require("../Controllers/AuthController");
const ytdl = require("ytdl-core");

router.get("/", AuthController.protectGlobal, function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      message: "this req in not allowed",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
});
app.get("/download", (req, res) => {
  var url = req.query.url;

  res.header("Content-Disposition", 'attachment; filename="Video.mp4');
  ytdl(url, {
    filter: (format) => format.container === "mp4",
    quality: "highest",
  }).pipe(res);
});

module.exports = router;
