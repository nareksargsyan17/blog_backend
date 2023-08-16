const router = require("express").Router();
const { getComments } = require("../../../controllers/commentController");

router.get("/get/:id", getComments);

module.exports = router;