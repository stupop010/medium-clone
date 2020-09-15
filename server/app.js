const express = require("express");
const morgan = require("morgan");
const errorhandler = require("errorhandler");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const models = require("./models");
const passport = require("passport");
const app = express();

const PORT = process.env.PORT || 3241;
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("common"));
app.use(cors());

// Middleware to pass on the models to routes
app.use((req, res, next) => {
  req.models = models;

  next();
});

if (!isProduction) {
  app.use(errorhandler());
}

require("./config/passport");
app.use(require("./routes"));

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;

  next(err);
});

if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log("-----------");
    console.log(err.message, "error");
    console.log("-----------");

    res.status(err.status || 500);

    res.json({
      message: err.message,
      error: err,
    });
  });
}

(async () => {
  try {
    await models.sequelize.sync();

    console.log("Connection has been established successfully.");

    app.listen(PORT, () => {
      console.log(`Listing on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
