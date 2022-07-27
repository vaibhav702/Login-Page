const jwt = require("jsonwebtoken");
const secretkey = "uidesignAssignment";

const authentication = async function (req, res, next) {
    try {
      let token = req.headers["x-auth-token"];
      if (!token) {
        return res
          .status(404)
          .send({ status: false, message: "Please pass token" });
      }
  
      jwt.verify(token, secretkey, function (error, decode) {
        if (error) {
          //setHeader("Content-Type", "text/JSON")
          return res
            .status(400)
            .setHeader("Content-Type", "text/JSON")
            .send({ status: false, message: error.message });
        }
        next();
      });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };
  
  //---------------------------Authorization---------------------------------------------------------------//
  const authorization = async function (req, res, next) {
    try {
      let token = req.headers["x-auth-token"];
  
      if (!token) {
        return res
          .status(404)
          .send({ status: false, message: "Please pass token" });
      }
      let decodedToken;
      jwt.verify(token, secretkey, async function (error, decode) {
        if (error) {
          return res.status(400).send({ status: false, message: error.message });
        }
        decodedToken = decode;
        next();
      });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };
  
  module.exports.authorization = authorization;
  module.exports.authentication = authentication;