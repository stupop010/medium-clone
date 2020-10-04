const router = require("express").Router();

router.use("/user", require("./userRoutes"));
router.use("/article", require("./articleRoutes"));
router.use("/comment", require("./commentRoutes"));
router.use("/profile", require("./profileRoutes"));
router.use("/tags", require("./tagsRoutes"));

module.exports = router;
