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
      