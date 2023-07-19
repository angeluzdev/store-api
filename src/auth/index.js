const passport = require('passport');
const { signIn, signUp } = require('./strategies/local-strategy');
const jwtStrategy = require('./strategies/jwt-strategy');
passport.use('local.signin', signIn);
passport.use('local.signup', signUp);
passport.use('jwt', jwtStrategy);