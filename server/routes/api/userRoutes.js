const router = require("express").Router();

const passport = require("passport");

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  const { models } = req;

  try {
    const user = await models.User.create({
      name: name,
      password: password,
      email: email,
    });

    res.json({
      ...user.toAuthJson(),
      token: user.createJWTToken(),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return res.status(422).json({ error: "Can't be blank" });

  if (!password) return res.status(422).json({ error: "Can't be blank" });

  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (user) {
      res.json({
        ...user.toAuthJson(),
        token: user.createJWTToken(),
      });
    } else {
      res.status(422).json({ error: info.message });
    }
  })(req, res, next);
});

module.exports = router;
