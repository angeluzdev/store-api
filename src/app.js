const express = require('express');
const { isBoomError, errorInternal } = require('./middlewares/errors.handler');
const parser = require('cookie-parser');
const app = express();
const routers = require('./routers');
const passport = require('passport');
const cors = require('cors');

//settings
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(parser());
app.use(cors({
  origin: 'https://store-front-zio1.onrender.com',
  credentials: true
}))
require('./auth');

app.use( (req, res, next) => passport.authenticate('jwt', {session: false}, (err, user, info, status) => {
  req.user=user;
  console.log(user);
  console.log(req.cookies);
  next();
})(req,res,next));

app.get('/', (req, res) => {
  res.send('Hola desde internet');
})

//routing
routers(app);

//middlewares error
app.use(isBoomError);
app.use(errorInternal);

app.listen(app.get('port'))



