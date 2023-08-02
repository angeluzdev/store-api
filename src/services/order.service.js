const pool = require('../../db');
const boom = require('@hapi/boom')

class Order {
  async insertOrder(products, userID) {
    const [info] = await pool.query("insert into sale_order (user_id) values(?)", [userID]);
    const productsMap = products.map(p => ([
      info.insertId,
      p.id,
      p.qty
    ]))
    await pool.query('insert into sale_products (order_id, product_id, qty) values ?', [productsMap]);
    return { message: 'success' }
  }

  async getOrderByUserId(userId) {
    const [orders] = await pool.query('select * from sale_order where user_id=?', [userId]);
    for(let i=0; i<orders.length; i++) {
      const [products] = await pool.query('select sp.qty, sp.product_id, p.title, p.price from sale_order so inner join sale_products sp on(so.id=sp.order_id) inner join products p on(sp.product_id=p.id) where sp.order_id=?', [orders[i].id]);
      orders[i].products = products;
    }

    return orders
  }
}

module.exports = Order;