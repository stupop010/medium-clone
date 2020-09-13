const router = require("express").Router();
const { required, optional } = require("../auth");

router.get("/", optional, async (req, res, next) => {
  const { models } = req;
  try {
    const response = await models.Article.findAll({
      order: [["createdAt", "DESC"]],
      limit: 25,
      include: models.Tag,
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  }
});

router.post("/new", required, async (req, res, next) => {
  const { title, about, body, tags } = req.body;
  const { models } = req;

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
      userId: req.user.id,
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

    res.json(article);
  } catch (err) {
    console.log("-------------------");
    console.log(err);
    console.log("-------------------");
    next(err);
  }
});

module.exports = router;