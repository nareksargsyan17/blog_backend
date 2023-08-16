const { Like } = require("../models")

const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Like.create({
      postId: id,
      userId: req.user.id
    })

    return res.status(200).send({
      successMessage: "like",
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

module.exports = {
  likePost
}