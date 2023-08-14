const router = require("express").Router();
const { addPost, getPostById} = require("../../../controllers/postController");
const upload = require("../../../config/imageConfig");
const { uploadImages } = require("../../../controllers/imageController");

router.post("/add", addPost);
router.post("/upload/:id", upload.single("image"), uploadImages);
router.get("/get/:id", getPostById);

module.exports = router;