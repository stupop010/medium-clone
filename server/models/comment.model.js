const comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Comment.prototype.findAndCountPaginationComment = async function (
    models,
    articleId,
    limit,
    offset
  ) {
    return await Comment.findAndCountAll({
      where: {
        articleId,
      },
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: models.User,
          attributes: ["name", "id"],
        },
      ],
    });
  };

  Comment.associate = (models) => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Article);
  };

  return Comment;
};

module.exports = comment;
