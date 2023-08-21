const router = require("express").Router();
const { changePassword, getUser } = require("../../../controllers/userController");
const checkingPass = require("../../../middleware/changePassMiddleware");
const upload = require("../../../config/imageConfig");
const {uploadImages} = require("../../../controllers/imageController");

router.put("/change_pass",  checkingPass, changePassword);
router.get("/get/user", getUser)


module.exports = router;