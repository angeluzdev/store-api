const express = require('express');
const { isBoomError, errorInternal } = require('./middlewares/errors.handler');
const parser = require('cookie-parser');
const app = express();
const routers = require('./routers');
const passport = require('passport');
const cors = require('cors');
const doten = require('dotenv')

//settings
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(parser());
doten.config();
app.use(cors({
  origin: process.env.URL_FRONT,
  credentials: true
}))
require('./auth');

app.use( (req, res, next) => passport.authenticate('jwt', {session: false}, (err, user, info, status) => {
  req.user=user;

  next();
})(req,res,next));

app.get('/api', (req, res) => {
  res.send('Hola desde internet');
})

//routing
routers(app);

//middlewares error
app.use(isBoomError);
app.use(errorInternal);

app.listen(app.get('port'))



