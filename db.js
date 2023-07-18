const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
})

connection.getConnection((err, connection) => {
  if(err) throw err;
  if(connection) connection.release();
  console.log('DB IS CONNECT');
  return;
})

const pool = connection.promise();


module.exports = pool;


