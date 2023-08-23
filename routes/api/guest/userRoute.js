const router = require("express").Router();
const { registration, login, getUserById} = require("../../../controllers/userController");
const verify = require("../../../middleware/verifyUserMiddleware");


router.post("/registration", registration);
router.post("/login", verify, login);
router.get("/get/:id", getUserById);

module.exports = router;