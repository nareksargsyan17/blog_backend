const router = require("express").Router();
const { registration, login } = require("../../../controllers/userController");
const verify = require("../../../middleware/verifyUserMiddleware")

router.post("/registration", registration);
router.post("/login", verify, login);

module.exports = router;