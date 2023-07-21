const Joi = require('joi');

const idSchema = Joi.object({
  id: Joi.number().integer().min(1).required()
})

const postSchema = Joi.object({
  title: Joi.string().min(1).max(70).required(),
  description: Joi.string().max(220).required(),
  price: Joi.number().min(4).required(),
  brand: Joi.string().alphanum().max(20).required(),
  image: Joi.string().max(50).required(),
  category_id: Joi.number().min(1).required()
})

const updateSchema = Joi.object({
  title: Joi.string().min(1).max(70),
  description: Joi.string().max(220),
  price: Joi.number().min(4),
  brand: Joi.string().alphanum().max(20),
  image: Joi.string().max(50),
  category_id: Joi.number().min(1)
})

const titleSchema = Joi.object({
  t: Joi.string().required()
})

const rangeSchema = Joi.object({
  min: Joi.number().integer().min(1).required(),
  max: Joi.number().integer().min(1).required()
})

module.exports = { idSchema, postSchema, updateSchema, titleSchema, rangeSchema };
