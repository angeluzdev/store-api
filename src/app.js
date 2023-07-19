const express = require('express');
const { isBoomError, errorInternal } = require('./middlewares/errors.handler');
const app = express();
const routers = require('./routers');

//settings
app.set('port', 3000);
app.use(express.json());
require('./auth');


//routing
routers(app);

//middlewares error
app.use(isBoomError);
app.use(errorInternal);

// app.get('/', async (req,res) => {
//   const [products] = await pool.query('select * from products');
//   console.log(products);
//   res.send(products);
// })

app.listen(app.get('port'), () => {
  console.log('SERVER INICIALIZADO');
})



