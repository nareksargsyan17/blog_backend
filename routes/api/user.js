const router = require("express").Router();

const userRoute = require("./user/userRoute");
const postRoute = require("./user/postRoute");
const likeRoute = require("./user/likeRoute");
const commentRoute = require("./user/commentRoute");

const auth = require("../../middleware/authMiddleware");

router.use(auth);

router.use("/user", userRoute);
router.use("/post", postRoute);
router.use("/like", likeRoute);
router.use("/comment", commentRoute);

module.exports = router;