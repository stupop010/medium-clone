const router = require("express").Router();

router.use("/api", require("./api"));

router.get("/api/g", (req, res) => {
  res.json({
    hello: "hello",
  });
});

module.exports = router;
