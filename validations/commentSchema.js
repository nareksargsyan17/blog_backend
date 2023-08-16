const Joi = require("joi");

const commentSchema = Joi.object({
  comment: Joi.string()
    .required(),
  userId: Joi.number()
    .integer()
    .required(),
  postId: Joi.number()
    .integer()
    .required(),
  parentId: Joi.number()
      .allow(null)
})

module.exports = commentSchema