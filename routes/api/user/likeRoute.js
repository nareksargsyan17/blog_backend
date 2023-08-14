const router = require("express").Router();
const { likePost } = require("../../../controllers/likeController");
const likeMiddleware = require("../../../middleware/likeMiddleware")

router.post("/add/:id", likeMiddleware, likePost);

module.exports = router;