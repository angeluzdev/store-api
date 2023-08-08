const LocalStrategy = require('passport-local').Strategy;
const Auth = require('../../services/auth.service');
const service = new Auth();

const signIn = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const user = await service.authenticateUser(username, password);
    done(null, user)
  } catch (error) {
    done(error, false);
  }
});

const signUp = new LocalStrategy({
  usernameField: 'username',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const role = req.body.role ?? 'customer';
  try {
    const {email} = req.body;
    const newUser = {
      username,
      password,
      role,
      email
    }
    const user = await service.registerUser(newUser);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
})

module.exports = {signIn, signUp};
