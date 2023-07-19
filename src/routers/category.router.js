const express = require('express');
const Category = require('./../services/category.service');
const passport = require('passport');
const service = new Category();
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
})

router.post('/', passport.authenticate('jwt', {session: false}),async (req, res, next) => {
  try {
    const message = await service.setCategory(req.body);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const message = await service.deleteCategory(req.params.id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.put('/update/:id', async (req,res, next) => {
  try {
    const message = await service.updateCategory(req.body, req.params.id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

module.exports = router;