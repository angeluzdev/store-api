const pool = require('./../../db');
const boom = require('@hapi/boom');

class Product {

  async categoryByItem(arr) {
    for(let i=0;i < arr.length; i++) {
      const [category] = await pool.query('select * from categories where id=?', [arr[i].category_id]);
      delete arr[i].category_id;
      arr[i].category = category[0];
    }
  }

  async getProducts() {
    const [products, fields] = await pool.query('select * from products');

    await this.categoryByItem(products);

    return products;
  }

  async getSingleProduct(id) {
    const [product] = await pool.query('select * from products where id=?', [id]);
    if(product.length == 0) throw boom.notFound('Id no match');
    await this.categoryByItem(product);
    const [reviews] = await pool.query('select r.id, r.content, r.create_at, u.username from reviews r inner join users u on(r.user_id=u.id) where r.product_id=?', id);
    product[0].reviews = reviews;

    return product;
  }

  async getProductPagination(offset, limit) {
    const [products] = await pool.query("select * from products limit ?, ?", [offset*limit, limit]);

    await this.categoryByItem(products);

    return products;
  }

  async getProductsByTitle(title) {
    const [products] = await pool.query("select * from products where title like concat('%',?,'%')", [title]);

    await this.categoryByItem(products);

    return products;
  }

  async getProductsByPriceRange(min, max) {
    const [products] = await pool.query('select * from products where price >= ? and price <=?', [min,max]);

    await this.categoryByItem(products);

    return products;
  }

  async getProductByCategoryId(id) {
    const [products] = await pool.query('select * from products where category_id=?', [id]);
    await this.categoryByItem(products);
    return products;
  }

  async setProduct(data) {
    const [info] = await pool.query('insert into products set ?', [data]);

    return {message: 'success', newId: info.insertId};
  }

  async deleteProduct(id) {
    const [info] = await pool.query('delete from products where id=?', [id]);
    if(info.affectedRows == 0) throw boom.notFound('Id inexistente');

    return {message: 'success'};
  }

  async updateProducts(data, id) {
    const [info] = await pool.query('update products set ? where id=?', [data ,id]);

    if(info.affectedRows == 0) throw boom.notFound('Id inexistente');

    return {message: 'success'};
  }

}

module.exports = Product;