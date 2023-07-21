const express = require('express');
const { isBoomError, errorInternal } = require('./middlewares/errors.handler');
const parser = require('cookie-parser');
const app = express();
const routers = require('./routers');
const passport = require('passport');

//settings
app.set('port', 3000);
app.use(express.json());
app.use(parser());
require('./auth');

app.use( (req, res, next) => passport.authenticate('jwt', {session: false}, (err, user, info, status) => {
  req.user=user;
  next();
})(req,res,next));

//routing
routers(app);

//middlewares error
app.use(isBoomError);
app.use(errorInternal);

app.listen(app.get('port'), () => {
  console.log('SERVER INICIALIZADO');
})



