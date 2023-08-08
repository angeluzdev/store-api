const express = require('express');
const Category = require('./../services/category.service');
const { postSchema, updateSchema }  = require('../schemas/category.schema');
const validateData = require('../middlewares/data.handler');
const { isAuthenticate } = require('../middlewares/auth.handler');
const { idSchema } = require('../schemas/product.schema');
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

router.post('/', isAuthenticate, validateData('body', postSchema), async (req, res, next) => {
  try {
    const message = await service.setCategory(req.body);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.delete('/delete/:id', validateData('params', idSchema) ,async (req, res, next) => {
  try {
    const message = await service.deleteCategory(req.params.id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.put('/update/:id', validateData('body', idSchema), async (req,res, next) => {
  try {
    const message = await service.updateCategory(req.body, req.params.id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

module.exports = router;