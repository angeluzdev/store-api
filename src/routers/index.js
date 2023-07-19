const express = require('express');
const itemRouter = require('./item.router');
const categoryRouter = require('./category.router');
const reviewRouter = require('./review.router');
const UserRouter = require('./user.router');

function setRoutersApp(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', itemRouter);
  router.use('/categories', categoryRouter);
  router.use('/reviews', reviewRouter);
  router.use('/users', UserRouter);
}

module.exports = setRoutersApp;



