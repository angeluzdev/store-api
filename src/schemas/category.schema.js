const Joi = require('joi');

const postSchema = Joi.object({
  category_name: Joi.string().max(40).pattern(/^[a-zA-Z]+$/).required()
})

const updateSchema = Joi.object({
  category_name: Joi.string().max(40).pattern(/^[a-zA-Z]+$/)
})

module.exports = { postSchema, updateSchema }
