const { Post, Like } = require("../models");
const {Op} = require("sequelize");

const likeMiddleware = async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findByPk(id);


  const like = await Like.findOne({
    where: {
      [Op.and]: [
        {
          postId: post.id
        },
        {
          userId: req.user.id
        }
      ]
    }
  })


  if (like) {
    try {
      await Like.destroy({
        where: {
          id: like.id
        }
      })
      return res.status(200).send(({
        successMessage: post.id
      }))
    } catch (error) {
      return res.status(500).send(({
        message: error.message
      }))
    }
  } else {
    next();
  }
}

module.exports = likeMiddleware