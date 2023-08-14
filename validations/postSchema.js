const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string()
    .required(),
  content: Joi.string()
    .required(),
  ownerId: Joi.number()
    .integer(),
})

module.exports = postSchema