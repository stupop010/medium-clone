const jwt = require("express-jwt");

function getTokenFromHeader(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
}

module.exports = {
  required: jwt({
    secret: process.env.SECRET,
    userProperty: "user",
    getToken: getTokenFromHeader,
    algorithms: ["HS256"],
  }),
  optional: jwt({
    secret: process.env.SECRET,
    userProperty: "user",
    credentialsRequired: false,
    getToken: getTokenFromHeader,
    algorithms: ["HS256"],
  }),
};
