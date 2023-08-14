const Joi = require("joi");


const changePassSchema = Joi.object({
  password: Joi.string()
    .required(),
  newPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirmNewPassword: Joi.any()
    .equal(Joi.ref('newPassword'))
    .required(),
})

exports.changePassSchema = changePassSchema