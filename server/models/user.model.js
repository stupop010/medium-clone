const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const db = require("./index");

const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.beforeCreate(async (user) => {
    user.password = user.hashedPassword();
  });

  User.prototype.hashedPassword = function () {
    return bcrypt.hashSync(this.password, 10);
  };

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.toAuthJson = function () {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
    };
  };

  return User;
};

module.exports = user;