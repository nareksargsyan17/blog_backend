const { Like } = require("../models")

const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req)
    console.log(id)
    await Like.create({
      postId: id,
      userId: req.user.id
    })

    return res.status(200).send({
      successMessage: "Like"
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