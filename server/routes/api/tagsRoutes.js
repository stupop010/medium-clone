const router = require("express").Router();

const models = require("../../models");

router.get("/", async (req, res, next) => {
  try {
    const response = await models.Tag.findAll({
      attributes: ["tag"],
      group: ["tag"],
      order: [
        [models.sequelize.fn("count", models.sequelize.col("tag")), "DESC"],
      ],
      limit: 10,
    });

    return res.json(response);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
