const express = require('express');
const Auth = require('../services/auth.service');
const { signInSchema, signUpSchema } = require('../schemas/auth.schema');
const validateData = require('../middlewares/data.handler');
const service = new Auth();
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    const user = req.user ?? false;
    res.json(user)
  } catch (error) {
    next(error);
  }
})

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

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const message = await service.sendRecoveryPassword(email);
    res.json(message);
  } catch (error) {
    next(error);
  }
})

router.post('/change-password', async (req, res, next) => {
  try {
    const { newPassword, token } = req.body
    const message = await service.changePassword(token, newPassword);
    res.json(message);
  } catch (error) {
    next(error);
  }
}) 

module.exports = router;
