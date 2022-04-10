const jwt = require("jsonwebtoken");
const config = require("../config");

verifyToken = (req, res, next) => {
 
  let bearerHeader = req.headers["authorization"]

  if (!bearerHeader) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  let token = bearerHeader.replace('Bearer ',''); 

  jwt.verify(token, config.secret, (err, decoded) => {
   
    if (err) {
      return res.status(401).send({
        message: "You must be authenticated to perform this action!",
      });
    }
    req.userId = decoded.id;
    req.roles = decoded.roles;
    req.agence = decoded.agence;
    req.permissions= decoded.permissions;
    id = decoded.id;

    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
