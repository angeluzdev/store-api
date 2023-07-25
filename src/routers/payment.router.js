const { Router } = require('express')
const router = Router();
const Payment = require('../services/payment.service');
const { isAuthenticate }  = require('../middlewares/auth.handler');
const service = new Payment();

router.post('/', isAuthenticate, async (req, res, next) => {
  try {
    const paymentSession = await service.createSessionPayment(req.body);
    res.json({ 'url': paymentSession.url });
  } catch (error) {
    next(error)
  }
})

module.exports = router;