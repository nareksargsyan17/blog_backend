const router = require("express").Router();
const { changePassword, getUser, editUser} = require("../../../controllers/userController");
const checkingPass = require("../../../middleware/changePassMiddleware");
const upload = require("../../../config/imageConfig");

router.put("/change_pass",  checkingPass, changePassword);
router.get("/get/user", getUser);
router.patch("/edit", upload.single("avatar"), editUser);


module.exports = router;