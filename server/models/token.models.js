const token = (sequelize, DataTypes) => {
  const Token = sequelize.define("token", {
    tag: {
      type: DataTypes.STRING,
    },
  });

  return Token;
};

module.exports = token;
