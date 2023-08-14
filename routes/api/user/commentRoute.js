const router = require("express").Router();
const { addComment, getComments} = require("../../../controllers/commentController");
const commentMiddleware = require("../../../middleware/commentMiddleware")

router.post("/add", commentMiddleware, addComment);
router.get("/get", getComments);

module.exports = router;