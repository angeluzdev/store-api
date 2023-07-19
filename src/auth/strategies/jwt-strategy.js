const { ExtractJwt, Strategy } = require('passport-jwt');
require('dotenv').config();
const JwtStrategy = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}, (payload, done) => {
  done(null, payload);
})

module.exports = JwtStrategy;
