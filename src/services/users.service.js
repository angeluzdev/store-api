const boom = require('@hapi/boom');
const pool = require('../../db');

class User {
  async getAllUsers() {
    const [users] = await pool.query('select id, username, email, joined from users');
    return users;
  }

  async getSingleUser(id) {
    const [user] = await pool.query('select id, username, email, joined from users where id=?', id);
    if(user.length === 0) throw boom.notFound('Id inexistente');
    return user;
  }

  async getUserByEmail(email) {
    const [user] = await pool.query('select * from users where email=?', email);
    if(user.length==0) throw boom.notFound('Email inexistente');
    return user[0];
  }

  async createNewUser(data) {
    const [info] = await pool.query('insert into users set ?', data);
    return {message: 'success', newId: info.insertId};
  }

  async deleteUser(id) {
    await pool.query('delete from users where id=?', id);
    return {message: 'success'}
  }
}

module.exports = User;
