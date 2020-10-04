const router = require("express").Router();
const models = require("../../models");

router.get("/:user", async (req, res, next) => {
  const { user } = req.params;

  try {
    const response = await models.User.findOne({
      where: {
        name: user,
      },
    });

    if (!response) return res.status(404).json({ error: "User not found!" });

    const userWithArticles = await models.User.findOne({
      where: {
        id: response.id,
      },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: models.Article,
          where: { userId: response.id },
          order: [["createdAt", "DESC"]],
          include: [
            models.Tag,
            models.Follow,
            {
              model: models.User,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    res.json(userWithArticles);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
