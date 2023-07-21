const express = require('express');
const User = require('../services/users.service');
const service = new User();
const router = express.Router();

router.get('/', async (req,res,next) => {
  try {
    const users = await service.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req,res,next) => {
  try {
    const {id} = req.params;
    const user = await service.getSingleUser(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
})


router.delete('/delete/:id', async (req,res,next) => {
  try {
    const {id} = req.params;
    const message = await service.deleteUser(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

module.exports = router;