const slugify = require("slugify");

const article = (sequelize, DataTypes) => {
  const Article = sequelize.define("article", {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Article.beforeValidate(async (article) => {
    article.slug =
      slugify(article.title) +
      "-" +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(32);
  });

  Article.associate = (models) => {
    Article.belongsTo(models.User);
    Article.hasMany(models.Tag, {
      foreignKey: "articleId",
    });
    Article.hasMany(models.Follow);
  };

  return Article;
};

module.exports = article;
