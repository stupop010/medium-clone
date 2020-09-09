const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/medium`
);

const models = {
  User: require("./user.model")(sequelize, Sequelize.DataTypes),
};

models.Sequelize = Sequelize;
models.sequelize = sequelize;

module.exports = models;
