const router = require("express").Router();
const { required } = require("../auth");

router.get("/:articleId", async (req, res, next) => {
  const { articleId } = req.params;
  const { models } = req;
  const { limit, offset = 0 } = req.query;

  try {
    const response = await models.Comment.prototype.findAndCountPaginationComment(
      models,
      articleId,
      limit,
      offset
    );

    return res.json(response);
  } catch (err) {
    next(err);
  }
});

router.post("/new", required, async (req, res, next) => {
  const { textValue, articleId, limit, offset } = req.body;
  const { models } = req;
  const { user } = req.user;

  if (!textValue)
    return res.status(422).json({ error: "Text field can not be blank" });
  if (!articleId)
    return res.status(422).json({ error: "Article id not passed down" });

  try {
    await models.Comment.create({
      comment: textValue,
      userId: user._id,
      articleId,
    });

    const response = await models.Comment.prototype.findAndCountPaginationComment(
      models,
      articleId,
      limit,
      offset
    );

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

    const response = await models.Comment.prototype.findAndCountPaginationComment(
      models,
      articleId,
      limit,
      offset
    );

    return res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
