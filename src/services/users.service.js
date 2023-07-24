const boom = require('@hapi/boom');
const pool = require('../../db');

class User {
  async getAllUsers() {
    const [users] = await pool.query('select id, username, email, joined from users');
    return users;
  }

  async getSingleUser(id) {
    const [user] = await pool.query('select id, username, email, joined, recovery_token from users where id=?', id);
    if(user.length === 0) throw boom.notFound('Id inexistente');
    delete user[0].recovery_token;
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

  async updateUser(data, id) {
    const [info] = await pool.query('update from users set ? where id=?', [data, id]);
    return {message: 'success'};
  }

  async deleteUser(id) {
    const [info] = await pool.query('delete from users where id=?', id);
    if(info.affectedRows == 0) throw boom.notFound('Id inexistente');
    return {message: 'success'}
  }
}

module.exports = User;
