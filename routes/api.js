const router = require("express").Router();

const authRouter = require("./api/user")
const guestRouter = require("./api/guest")


router.use("/auth", authRouter)
router.use("/guest", guestRouter)


module.exports = router;