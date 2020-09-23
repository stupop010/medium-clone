const comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Article);
  };

  return Comment;
};

module.exports = comment;
