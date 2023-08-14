const router = require("express").Router();
const userRoute = require("./guest/userRoute");
const postRoute = require("./guest/postRoute")


router.use("/user", userRoute);

router.use("/post", postRoute);

module.exports = router;