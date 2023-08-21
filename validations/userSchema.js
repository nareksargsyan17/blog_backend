const Joi = require("joi");
const { User } = require("../models");

async function existsUser(email) {
  const user = await User.findOne({
    where: {
         email
    }
  });

  if (user) {
    throw new Error('Email already exists');
  }

  return user;
}

const userSchema = Joi.object({
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required(),
  email: Joi.string()
    .min(3)
    .external(existsUser)
    .required()
    .email(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  re_password: Joi.any()
    .equal(Joi.ref('password'))
    .required(),
  avatar: Joi.string()
})

exports.userSchema = userSchema;