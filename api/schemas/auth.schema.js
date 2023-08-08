const Joi = require('joi');

const signUpSchema = Joi.object({
  username: Joi.string().max(50).required(),
  email: Joi.string().max(50).required(),
  password: Joi.string().max(50).required()
})

const signInSchema = Joi.object({
  email: Joi.string().email().max(50).required(),
  password: Joi.string().max(50).required()
})

module.exports = { signInSchema, signUpSchema }
