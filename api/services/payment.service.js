require('dotenv').config();
const stripe = require('stripe')(process.env.PAY_KEY);
const Product = require('./item.service');
const service = new Product();

class Payment {

  async getInfoProducts(dataProducts) {
    const productItems = [];
    for(let i=0; i<dataProducts.length; i++) {
      const product = await service.getSingleProduct(dataProducts[i].id);
      const productFinal = {
        price_data: {
          product_data: {
            name: product[0].title
          },
          currency: 'usd',
          unit_amount: product[0].price*100
        },
        quantity: dataProducts[i].qty
      }
      productItems.push(productFinal)
    }
    return productItems;
  }

  async createSessionPayment(data) {
    const session = await stripe.checkout.sessions.create({
      line_items: await this.getInfoProducts(data),
      mode: 'payment',
      success_url: 'http://localhost:4000/success',
      cancel_url: 'http://localhost:4000/shopping'
    })
    return session;
  }
}

module.exports = Payment