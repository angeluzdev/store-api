const express = require('express');
const Product = require('../services/item.service');
const service = new Product();
const router = express.Router();

router.get('/', async (req,res, next) => {
  try {

    if(req.query.offset && req.query.limit) {
      const offset = req.query.offset >= 0 ? Number(req.query.offset) : 0;
      const limit = req.query.limit >= 0 ? Number(req.query.limit) : 10;
      const products = await service.getProductPagination(offset, limit);
      return res.json(products);
    }

    const products = await service.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req,res,next) => {
  try {
    const {id} = req.params;
    const product = await service.getSingleProduct(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
})

router.get('/title/:t', async (req,res, next) => {
  try {
    const {t} = req.params;
    const products = await service.getProductsByTitle(t);
    res.json(products);
  } catch (error) {
    next(error);
  }
})

router.get('/range/:min/:max', async (req, res, next) => {
  try {
    const {min, max} = req.params;
    const products = await service.getProductsByPriceRange(min,max);
    res.json(products);
  } catch (error) {
    next(error);
  }
})

router.get('/category/:id', async (req,res,next) => {
  try {
    const {id} = req.params;
    const products = await service.getProductByCategoryId(id);
    res.json(products);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req,res, next) => {
  try {
    const message = await service.setProduct(req.body);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.put('/update/:id', async (req,res, next) => {
  try {
    const {id} = req.params
    const message = await service.updateProducts(req.body, id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.delete('/delete/:id', async (req,res, next) => {
  try {
    const {id} = req.params;
    const message = await service.getProducts(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

module.exports = router;

