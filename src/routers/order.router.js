const { Router } = require('express');
const Order = require('../services/order.service');
const { isAuthenticate } = require('../middlewares/auth.handler');
const service = new Order();
const router = Router();

router.post('/', isAuthenticate, async (req, res, next) => {
  try {
    const message = await service.insertOrder(req.body, 4);
    res.json(message);
  } catch (error) {
    next(error)
  }
})

router.get('/my-orders', isAuthenticate, async (req, res, next) => {
  try {
    const { sub } = req.user
    const orders = await service.getOrderByUserId(sub)
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

module.exports = router
