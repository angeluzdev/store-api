const Joi = require('joi');

const postSchema = Joi.object({
  content: Joi.string().max(244).required(),
  product_id: Joi.number().integer().min(1).required()
})

module.exports = postSchema
