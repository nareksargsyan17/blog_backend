const router = require("express").Router();
const { addPost, deletePost, getUserPosts, getUserLikedPosts} = require("../../../controllers/postController");
const upload = require("../../../config/imageConfig");
const validateId = require("../../../middleware/likedPostMiddleware");

router.post("/add", upload.single("image"), addPost);
router.delete("/delete/:id", deletePost)
router.get("/get/:userId/liked_posts", validateId, getUserLikedPosts);

module.exports = router;