const boom = require('@hapi/boom');
const pool = require('./../../db');

class Category {
  async getCategories() {
    const [categories] = await pool.query('select * from categories');
    return categories;
  }

  async setCategory(data) {
    const [info] = await pool.query('insert into categories set ?', [data]);
    return {message: 'success', newId: info.insertId};
  }

  async updateCategory(data, id) {
    const [info] = await pool.query('update categories set ? where id=?', [data, id]);

    if(info.affectedRows == 0) throw boom.notFound('Id inexistente');

    return {message: 'success'}
  }

  async deleteCategory(id) {
    const [info] = await pool.query('delete from categories where id=?', [id]);

    if(info.affectedRows == 0) throw boom.notFound('Id inexistente');

    return {message: 'success'};
  }
}

module.exports = Category;