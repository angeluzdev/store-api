const boom = require('@hapi/boom');
const pool = require('../../db');

class Review {
  async getReviewsByProductId(id) {
    const [reviews] = await pool.query('select * from reviews where product_id=?', [id]);
    return reviews;
  }

  async setNewReview(data) {
    const [info] = await pool.query('insert into reviews set ?', [data]);
    return {message: 'success', newId: info.insertId};
  }

  async deleteReview(id) {
    const [info] = await pool.query('delete from reviews where id=?', id);
    return {message: 'succes'};
  }
}

module.exports = Review;