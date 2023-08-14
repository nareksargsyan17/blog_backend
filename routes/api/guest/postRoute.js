const router = require("express").Router();
const { getPosts } = require("../../../controllers/postController");

router.get("/get_all", getPosts);

module.exports = router;