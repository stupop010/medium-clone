const router = require("express").Router();
const models = require("../../models");
const { required } = require("../auth");

router.get("/:articleId", async (req, res, next) => {
  const { articleId } = req.params;
  const { models } = req;
  const { limit, offset = 0 } = req.query;

  try {
    const response = await models.Comment.findAndCountAll({
      where: {
        articleId,
      },
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: models.User,
          attributes: ["name", "id"],
        },
      ],
    });

    return res.json(response);
  } catch (err) {
    next(err);
  }
});

router.post("/new", required, async (req, res, next) => {
  const { textValue, articleId, limit, offset } = req.body;
  const { models } = req;
  const { user } = req.user;

  if (!textValue) return res.status(422).json({ error: "Can't be blank" });
  if (!articleId)
    return res.status(422).json({ error: "Article id not passed down" });

  try {
    await models.Comment.create({
      comment: textValue,
      userId: user._id,
      articleId,
    });

    const response = await models.Comment.findAll({
      where: {
        articleId,
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: models.User,
          attributes: ["name", "id"],
        },
      ],
    });

    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

router.delete("/", required, async (req, res, next) => {
  const { commentId, articleId, limit, offset } = req.query;
  const { models } = req;
  const { user } = req.user;

  try {
    const commentDeleted = await models.Comment.destroy({
      where: { id: commentId, userId: user._id },
    });

    if (!commentDeleted)
      return res.status(403).json({
        message: "Either comment not found or forbidden to delete",
      });

    const response = await models.Comment.findAll({
      where: {
        articleId,
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: models.User,
          attributes: ["name", "id"],
        },
      ],
    });

    console.log(response);
    return res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
