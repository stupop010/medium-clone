const jwt = require("jsonwebtoken");

const generateToken = (id, name) => {
  return jwt.sign(
    {
      id,
      name,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.SECRET
  );
};

module.exports = generateToken;
