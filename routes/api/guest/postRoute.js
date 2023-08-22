const router = require("express").Router();
const { getPosts, getPostById, getUserPosts } = require("../../../controllers/postController");
const validateId = require("../../../middleware/profileMiddleware");

router.get("/get_all", getPosts);
router.get("/get/:id/posts", validateId, getUserPosts);
router.get("/get/:id", getPostById);

module.exports = router;