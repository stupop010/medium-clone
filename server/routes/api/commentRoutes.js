const router = require("express").Router();
const { text } = require("express");
const { required } = require("../auth");

router.post("/new", required, async (req, res, next) => {
  const { textValue, articleId } = req.body;
  const { models } = req;
  const { user } = req.user;

  if (!textValue) return res.status(422).json({ error: "Can't be blank" });
  if (!articleId)
    return res.status(422).json({ error: "Article id not passed down" });

  try {
    const comment = await models.Comment.create({
      comment: textValue,
      userId: user._id,
      articleId,
    });

    const response = await models.Comment.findOne({
      where: {
        id: comment.id,
      },
      include: [
        {
          model: models.User,
          attributes: ["name"],
        },
      ],
    });

    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
