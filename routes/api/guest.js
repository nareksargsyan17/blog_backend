const router = require("express").Router();
const userRoute = require("./guest/userRoute");
const postRoute = require("./guest/postRoute");
const commentRoute = require("./guest/commentRoute")



router.use("/user", userRoute);
router.use("/comment", commentRoute);
router.use("/post", postRoute);

module.exports = router;