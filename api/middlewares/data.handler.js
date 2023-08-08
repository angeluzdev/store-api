const boom = require('@hapi/boom');

function validateData(param, schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req[param], { abortEarly: false })
    if(error) {
      return next(boom.badRequest(error))
    }
    next();
  }
}

module.exports = validateData
