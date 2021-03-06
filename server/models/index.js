const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/medium`
);

const models = {
  User: require("./user.model")(sequelize, Sequelize.DataTypes),
  Article: require("./article.model")(sequelize, Sequelize.DataTypes),
  Tag: require("./tag.model")(sequelize, Sequelize.DataTypes),
  Token: require("./token.models")(sequelize, Sequelize.DataTypes),
  Comment: require("./comment.model")(sequelize, Sequelize.DataTypes),
  Follow: require("./follow.models")(sequelize),
};

Object.keys(models).forEach((model) => {
  if ("associate" in models[model]) {
    models[model].associate(models);
  }
});

models.Sequelize = Sequelize;
models.sequelize = sequelize;

module.exports = models;
