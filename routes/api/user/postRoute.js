const router = require("express").Router();
const { addPost, deletePost, getUserLikedPosts, editPost} = require("../../../controllers/postController");
const upload = require("../../../config/imageConfig");
const validateId = require("../../../middleware/likedPostMiddleware");
const validatePostId = require("../../../middleware/postMiddleware");


router.post("/add", upload.single("image"), addPost);
router.delete("/delete/:id", deletePost)
router.get("/get/:userId/liked_posts", validateId, getUserLikedPosts);
router.put("/edit/:id", validatePostId, editPost);

module.exports = router;