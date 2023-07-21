const express = require('express');
const Auth = require('../services/auth.service');
const { signInSchema, signUpSchema } = require('../schemas/auth.schema');
const validateData = require('../middlewares/data.handler');
const service = new Auth();
const passport = require('passport');
const router = express.Router();

router.post('/signin', validateData('body', signInSchema), passport.authenticate('local.signin', {session: false}), async (req,res,next) => {
  try {
    const user = req.user;
    const token = await service.setToken(user);
    res.cookie('token_jwt', token.token);
    res.json(token);
  } catch (error) {
    next(error);
  }
})

router.post('/signup', validateData('body', signUpSchema), passport.authenticate('local.signup', {session: false}), async (req,res,next) => {
  try {
    const user = req.user;
    const token = await service.setToken(user);
    res.json(token);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
