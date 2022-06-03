const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { token } = require("morgan");
var db = require("../Models/DB");

exports.login = function (req, res, next) {
  try {
    db.query(
      "SELECT * FROM `user` where email like '" + req.body.email + "'",
      async function (err, result) {
        if (err) console.log(err);

        if (result.length === 0) {
          gado(false, "this email is not valid");
        } else if (req.body.password === "") {
          gado(false, "plz enter password");
        } else if (req.body.password !== result[0].password) {
          gado(false, "plz enter valid password");
        } else {
          let token = await jwt.sign({ id: result[0].id }, "hhhhhh");
          // db.end();
          res.status(201).json({
            status: "success",
            result,
            token,
          });
        }
      }
    );
    function gado(dl, message, result, token) {
      if (dl) {
        res.status(201).json({
          status: "success",
          message,
          result,
          token,
        });
      } else {
        res.status(404).json({
          status: "fail",
          message,
        });
      }
      return false;
    }
  } catch (err) {
    res.status(200).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.signUp = async function (req, res, next) {
  try {
    let pass = req.body.password;
    let user = { ...req.body };
    user.password = await bcrypt.hash(pass, 15);
    db.query(
      "SELECT * FROM `user` where username like '" + req.body.username + "'",
      await function (err, result) {
        if (err) throw new Error(err);
        if (result.length > 0) {
          let message = "this user name is already exist!!";
          // db.end();
          gado(false, message);
        } else {
          db.query(
            "SELECT * FROM `user` where email like '" + req.body.email + "'",
            async function (err, result) {
              if (err) throw new Error(err);
              if (result.length > 0) {
                let message = "this email is already exist!!";
                // db.end();
                gado(false, message);
              } else {
                db.query(

                  "INSERT INTO user (`username`, `email`, `password`)VALUES ('" +
                    user.username +
                    "', '" +
                    user.email +
                    "', '" +
                    user.password +
                    "' )",
                  function (err, result) {
                    if (err) throw new Error(err);
                    let token = jwt.sign({ id: result.insertId }, "hhhhhh");
                    db.query(
                      "INSERT INTO coin (`id`)VALUES ('" +
                        result.insertId +
                        "' )",
                      function (err, result) {
                        if (err) throw new Error(err);
                      }
                    );
                    // db.end();
                    gado(true, "", result, token);
                    // console.log(result);
                  }
                );
              }
              // db.end();
            }
          );
        }
      }
    );

    // console.log(req.body);
    function gado(dl, message, result, token) {
      if (dl) {
        res.status(201).json({
          status: "success",
          message,
          result,
          token,
        });
      } else {
        res.status(404).json({
          status: "fail",
          message,
        });
      }
      return false;
    }
    // res.status(201).json({
    //   status: "success",
    // });
  } catch (err) {
    res.status(200).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.protect = async function (req, res, next) {
  try {
    console.log("Middleware call");

    let token = req.headers.authorization;
    if (!token) {
      throw new Error("plz send token !!");
    }
    let tokenData = await jwt.verify(token, "hhhhhh");

    db.query(
      "SELECT * FROM `user` where id like '" + tokenData.id + "'",
      await function (err, result) {
        if (err) throw new Error(err);
        if (result.length <= 0) {
          let message = "User Not Found";
          gado(false, message);
          // db.end();
        } else {
          // let message = "done";
          // db.end();
          // gado(false, message);
          next();
        }
      }
    );

    function gado(dl, message, result, token) {
      if (dl) {
        res.status(200).json({
          status: "success",
          message,
          result,
          token,
        });
      } else {
        res.status(200).json({
          status: "fail",
          message,
        });
      }
      return false;
    }
  } catch (err) {
    res.status(200).json({
      status: "fail",
      message: err.message,
    });
  }
};
