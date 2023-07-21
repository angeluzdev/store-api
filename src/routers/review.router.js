const express = require('express');
const Review = require('../services/review.service');
const { isAuthenticate } = require('../middlewares/auth.handler');
const service = new Review();
const router = express.Router();

router.get('/:id', async (req,res,next) => {
  try {
    const {id} = req.params;
    const reviews = await service.getReviewsByProductId(id);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
})

router.post('/add', isAuthenticate, async (req,res,next) => {
  try {
    const message = await service.setNewReview(req.body);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.delete('/delete/:id', isAuthenticate, async (req,res,next) => {
  try {
    const {id} = req.params;
    const message = await service.deleteReview(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

module.exports = router;