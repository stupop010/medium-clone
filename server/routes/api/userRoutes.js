const router = require("express").Router();

const passport = require("passport");
const jwt = require("jsonwebtoken");
const { required } = require("../auth");

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

    console.log(refreshToken);

    res.status(201).json({
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

      res.json({
        ...user.toAuthJson(),
        accessToken: user.createAccessToken(),
        refreshToken: refreshToken.token,
      });
    } else {
      res.status(422).json({ error: info.message });
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
        { expiresIn: "2m" }
      );

      return res.status(201).json({ accessToken });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// exports.generateRefreshToken = async (req, res) => {
//   try {
//     //get refreshToken
//     const { refreshToken } = req.body;
//     //send error if no refreshToken is sent
//     if (!refreshToken) {
//       return res.status(403).json({ error: "Access denied,token missing!" });
//     } else {
//       //query for the token to check if it is valid:
//       const tokenDoc = await Token.findOne({ token: refreshToken });
//       //send error if no token found:
//       if (!tokenDoc) {
//         return res.status(401).json({ error: "Token expired!" });
//       } else {
//         //extract payload from refresh token and generate a new access token and send it
//         const payload = jwt.verify(tokenDoc.token, REFRESH_TOKEN_SECRET);
//         const accessToken = jwt.sign({ user: payload }, ACCESS_TOKEN_SECRET, {
//           expiresIn: "10m",
//         });
//         return res.status(200).json({ accessToken });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error!" });
//   }
