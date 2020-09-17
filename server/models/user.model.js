const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

  User.prototype.createAccessToken = function () {
    return jwt.sign(
      { user: { _id: this.id, name: this.name } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
  };

  User.prototype.createRefreshToken = function () {
    return jwt.sign(
      { user: { _id: this.id, name: this.name } },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
  };

  User.prototype.toAuthJson = function () {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
    };
  };

  User.associate = (models) => {
    User.hasMany(models.Article, {
      foreignKey: "userId",
    });
  };

  return User;
};

module.exports = user;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6MTgsIm5hbWUiOiJTdHVhcnQgRG9uZXkifSwiaWF0IjoxNjAwMzQxMjUxLCJleHAiOjE2MDAzNDEzNzF9.tIN60EO8GY3HQie9oyaMmXz73p7gDj-p8HwuKELW4dk
