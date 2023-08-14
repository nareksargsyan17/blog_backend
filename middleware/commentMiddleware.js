const { Comment, Post } = require("../models");

const commentMiddleware = async (req, res, next) => {
  const { parentId, postId } = req.body;

  const post = await Post.findByPk(postId);

  if (post) {
    let parent;
    if (parentId) {
      parent = await Comment.findByPk(parentId);

      if (parent) {
        next();
      } else {
        return res.status(500).send(({
          message: "parentId is invalid"
        }))
      }
    } else {
        next();
    }
  } else {
    return res.status(500).send(({
      message: "post is invalid"
    }))
  }
}

module.exports = commentMiddleware;