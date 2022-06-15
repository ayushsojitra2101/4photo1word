const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../Models/User");
const Coin = require("../Models/Coin");

exports.login = async function (req, res, next) {
  try {
    let email = req.body.email;

    let data = await User.findOne({ email });

    if (!data) {
      throw new Error("Please enter valid email");
    } else {
      let pass = req.body.password;
      let checkUser = await bcrypt.compare(pass, data.password);
      if (!checkUser) {
        throw new Error("Please enter valid password");
      } else {
        var token = await jwt.sign({ id: data._id }, "malkari");
        res.status(200).json({
          status: "200",
          message: "login successfully",
          data: data,
          token,
        });
      }
    }
  } catch (err) {
    res.status(200).json({
      status: "500",
      message: err.message,
    });
  }
};

exports.signUp = async function (req, res, next) {
  try {
    let email = req.body.email;
    let check = await User.find({ email: email });
    let pass = req.body.password;

    if (check[0]) {
      throw new Error("this emailId is already exist!!");
    }
    let user = { ...req.body };
    user.password = await bcrypt.hash(pass, 15);
    let newUser = await User.create(user);
    let newCoin = {
      userId: newUser._id,
      primary: 100,
      secondary: 0,
    };
    await Coin.create(newCoin);
    let token = await jwt.sign({ id: newUser._id }, "malkari");
    res.status(200).json({
      status: "200",
      message: "registration successfully",
      data: newUser,
      token,
    });
  } catch (err) {
    res.status(200).json({
      status: "500",
      message: err.message,
    });
  }
};

exports.protect = async function (req, res, next) {
  try {
    console.log("Middleware call");

    let token = req.headers.user_authorization;
    if (!token) {
      throw new Error("Please send token");
    }

    let tokenData = await jwt.verify(token, "malkari");
    req.params.id = tokenData.id;

    let checkUser = await User.findById(tokenData.id);

    if (!checkUser) {
      throw new Error("User Not Found");
    }
    next();
  } catch (err) {
    res.status(200).json({
      status: "500",
      message: err.message,
    });
  }
};

exports.resetpwd = async function (req, res, next) {
  try {
    let id = req.params.id;
    let checkUser = await User.findById(id);
    if (!checkUser) {
      throw new Error("User Not Found");
    } else {
      let data = await User.findById(id);
      let pass = req.body.password;
      let checkPass = await bcrypt.compare(pass, data.password);
      if (!checkPass) {
        throw new Error("Please enter valid password");
      } else {
        let newPassword = await bcrypt.hash(req.body.newpassword, 15);
        let finaleData = await User.findByIdAndUpdate(
          { _id: id },
          { password: newPassword }
        );
        res.status(200).json({
          status: "200",
          message: "password updated successfully",
          data: finaleData,
        });
      }
    }
  } catch (err) {
    res.status(200).json({
      status: "500",
      message: err.message,
    });
  }
};

exports.protectGlobal = async function (req, res, next) {
  try {
    let user = "Dione";
    let password = "Dione&169";

    // console.log(code1);
    let token = req.headers.data_authorization;
    if (!token) {
      throw new Error("Please send token");
    }

    let tokenData = await jwt.verify(token, "malkari");

    if (user != tokenData.user) {
      throw new Error("User Not Found");
    } else if (password != tokenData.password) {
      throw new Error("password is incorrect");
    }
    next();
  } catch (err) {
    res.status(200).json({
      status: "500",
      message: err.message,
    });
  }
};
