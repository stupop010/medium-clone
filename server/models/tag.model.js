const { sequelize } = require(".");

const tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define("tag", {
    tag: {
      type: DataTypes.STRING,
    },
  });

  return Tag;
};

module.exports = tag;
