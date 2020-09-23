const router = require("express").Router();

router.use("/user", require("./userRoutes"));
router.use("/article", require("./articleRoutes"));
router.use("/comment", require("./commentRoutes"));

module.exports = router;
