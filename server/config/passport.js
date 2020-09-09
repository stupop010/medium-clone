const passport = require("passport");
const models = require("../models");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await models.User.findOne({
        where: { email },
      });

      if (!user) {
        return done(null, false, {
          message: "Invalid credentials",
        });
      }

      const isValidPassword = user.comparePassword(password);

      if (!isValidPassword)
        return done(null, false, { message: "Invalid credentials" });

      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {});
passport.deserializeUser((id, done) => {});
