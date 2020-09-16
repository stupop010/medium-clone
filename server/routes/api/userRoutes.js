const router = require("express").Router();

const passport = require("passport");
const jwt = require("jsonwebtoken");
const { required } = require("../auth");

router.get("/", required, async (req, res, next) => {
  const { user } = req.user;
  const { models } = req;

  try {
    const userFound = await models.User.findOne({
      where: {
        id: user._id,
      },
    });

    return res.json(userFound.toAuthJson());
  } catch (err) {
    next(err);
  }
  res.json({ m: "s" });
});

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  const { models } = req;

  try {
    const user = await models.User.create({
      name,
      password,
      email,
    });

    const refreshToken = await models.Token.create({
      token: user.createRefreshToken(),
    });

    return res.status(201).json({
      ...user.toAuthJson(),
      accessToken: user.createAccessToken(),
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const { models } = req;

  if (!email) return res.status(422).json({ error: "Can't be blank" });

  if (!password) return res.status(422).json({ error: "Can't be blank" });

  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);

    if (user) {
      const refreshToken = await models.Token.create({
        token: user.createRefreshToken(),
      });

      return res.json({
        ...user.toAuthJson(),
        accessToken: user.createAccessToken(),
        refreshToken: refreshToken.token,
      });
    } else {
      return res.status(422).json({ error: info.message });
    }
  })(req, res, next);
});

router.post("/refresh", async (req, res, next) => {
  const { refreshToken } = req.body;
  const { models } = req;

  if (!refreshToken) {
    return res.status(403).json({ error: "Token missing" });
  }

  try {
    const token = await models.Token.findOne({
      where: {
        token: refreshToken,
      },
    });

    if (!token) {
      return res.status(401).json({ error: "Token expired" });
    } else {
      const payload = jwt.verify(token.token, process.env.REFRESH_TOKEN_SECRET);
      const accessToken = jwt.sign(
        { user: payload.user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      return res.status(201).json({ accessToken });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
