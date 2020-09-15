const token = (sequelize, DataTypes) => {
  const Token = sequelize.define("token", {
    token: {
      type: DataTypes.STRING,
    },
  });

  return Token;
};

module.exports = token;
