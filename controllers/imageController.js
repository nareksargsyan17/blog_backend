const { Image } = require("../models")

const uploadImages = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file;
    console.log(image)
    let currImage;

    if (id) {
      currImage = {
        userId: req.user.id,
        postId: id,
        path: image.path
      }
    } else {
      currImage = {
        userId: req.user.id,
        postId: null,
        path: image.path
      }
    }



    await Image.create(currImage);

    return res.status(200).send({
      successMessage: "uploaded"
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

module.exports = {
  uploadImages
}