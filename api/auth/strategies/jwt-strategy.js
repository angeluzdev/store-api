const { ExtractJwt, Strategy } = require('passport-jwt');
require('dotenv').config();

const extractorCustom = (req) => {
  const cookie = req.cookies.token_jwt;
  return cookie;
}

const JwtStrategy = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}, (payload, done) => {
  done(null, payload);
})

module.exports = JwtStrategy;
