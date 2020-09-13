const router = require("express").Router();

router.use("/user", require("./userRoutes"));
router.use("/article", require("./articleRoutes"));

module.exports = router;
