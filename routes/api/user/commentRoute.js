const router = require("express").Router();
const { addComment } = require("../../../controllers/commentController");
const commentMiddleware = require("../../../middleware/commentMiddleware")

router.post("/add", commentMiddleware, addComment);

module.exports = router;