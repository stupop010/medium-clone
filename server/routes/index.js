const router = require("express").Router();
const { required } = require("./auth");
router.use("/api", require("./api"));

router.get("/api/g", required, (req, res) => {
  res.json({
    hello: "hello",
  });
});

module.exports = router;
