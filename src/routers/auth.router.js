const express = require('express');
const Auth = require('../services/auth.service');
const service = new Auth();
const passport = require('passport');
const router = express.Router();

router.post('/signin', passport.authenticate('local.signin', {session: false}), async (req,res,next) => {
  try {
    const user = req.user;
    const token = await service.setToken(user);
    res.json(token);
  } catch (error) {
    next(error);
  }
})

router.post('/signup', passport.authenticate('local.signup', {session: false}), async (req,res,next) => {
  try {
    const user = req.user;
    const token = await service.setToken(user);
    res.json(token);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
