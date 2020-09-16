const router = require("express").Router();
const { required, optional } = require("../auth");

router.get("/", optional, async (req, res, next) => {
  const { models } = req;
  try {
    const response = await models.Article.findAll({
      include: [
        models.Tag,
        {
          model: models.User,
          attributes: ["name"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 25,
    });

    return res.json(response);
  } catch (err) {
    next(err);
  }
});

router.post("/new", required, async (req, res, next) => {
  const { title, about, body, tags } = req.body;
  const { models } = req;
  const { user } = req.user;

  if (!title) return res.status(422).json({ error: "Title can not be blank" });
  if (!about)
    return res
      .status(422)
      .json({ error: "The article about can not be blank" });
  if (!body)
    return res.status(422).json({ error: "The article body can not be blank" });

  try {
    const article = await models.Article.create({
      title,
      about,
      body,
      userId: user._id,
    });

    tags.forEach(async (tag) => {
      try {
        await models.Tag.create({
          tag,
          articleId: article.id,
        });
      } catch (err) {
        next(err);
      }
    });

    return res.status(201).json(article);
  } catch (err) {
    console.log("-------------------");
    console.log(err, "article error");
    console.log("-------------------");
    next(err);
  }
});

module.exports = router;
