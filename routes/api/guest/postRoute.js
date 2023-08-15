const router = require("express").Router();
const { getPosts, getPostById} = require("../../../controllers/postController");

router.get("/get_all", getPosts);
router.get("/get/:id", getPostById);

module.exports = router;