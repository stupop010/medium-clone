const router = require("express").Router();

const models = require("../../models");
const { required, optional } = require("../auth");

router.get("/", async (req, res, next) => {
  const query = {};
  const { Op } = models.Sequelize;
  if (typeof req.query.tag !== "undefined") query.tag = req.query.tag;

  try {
    const response = await models.Article.findAll({
      include: [
        {
          model: models.Tag,
          where: query.tag ? { tag: { [Op.like]: `%${query.tag}%` } } : null,
        },
        {
          model: models.User,
          attributes: ["name"],
        },
        {
          // TODO:
          // Count follows on article
          model: models.Follow,
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 25,
    });

    return res.json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/new", required, async (req, res, next) => {
  const { title, about, body, tags } = req.body;
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
    next(err);
  }
});

router.post("/follow", required, async (req, res, next) => {
  const { articleId } = req.body;
  const { user } = req.user;

  try {
    const currentFollow = await models.Follow.findOne({
      where: {
        articleId,
        userId: user._id,
      },
    });

    if (currentFollow) {
      return res.status(422).json({ error: "Already followed" });
    }

    await models.Follow.create({
      articleId,
      userId: user._id,
    });

    return res.status(201).json({ message: "success" });
  } catch (err) {
    next(err);
  }
});

router.get("/:article", async (req, res, next) => {
  const { article } = req.params;

  try {
    const response = await models.Article.findOne({
      where: {
        slug: article,
      },
      include: [
        models.Tag,
        {
          model: models.User,
          attributes: ["name"],
        },
      ],
    });

    return res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
