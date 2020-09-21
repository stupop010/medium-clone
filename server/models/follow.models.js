const follow = (sequelize) => {
  const Follow = sequelize.define("follow", {});

  Follow.associate = (models) => {
    Follow.belongsTo(models.User);
    Follow.belongsTo(models.Article);
  };

  return Follow;
};

module.exports = follow;
