const boom = require('@hapi/boom');

function isAuthenticate(req, res, next) {
  if(req.user) {
    return next();
  }

  throw boom.unauthorized('Sin autorizacion');
}

function isNotAuthenticate(req, res, next) {
  if(!req.user) {
    return next();
  }
  throw boom.conflict('Already authorized');
}

module.exports = { isAuthenticate, isNotAuthenticate };
