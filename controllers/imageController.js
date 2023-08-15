const { Image } = require("../models")
const {Op} = require("sequelize");

const uploadImages = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file;
    let currImage;
    let createdImage;

    if (id) {
      currImage = {
        userId: req.user.id,
        postId: id,
        path: image.path
      }
      createdImage = await Image.create(currImage);
    } else {
      currImage = {
        userId: req.user.id,
        postId: null,
        path: image.path
      }
      createdImage = await Image.update(currImage, {where: {
        [Op.and] : [
          {
            userId: currImage.userId
          },
          {
            postId: null
          }
        ]
        }});
    }

    return res.status(200).send({
      data: createdImage.path
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