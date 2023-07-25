const stripe = require('stripe')('sk_test_51NTBEQGO6WWeQhlHIQYmeUR0DwJePaSfBfR6QPQxa5MZQ2WLANntZdsGGllxPWUnbi2V0Wav9VMhEPYzDoZT0Hnu00FpUMXXyx')
const Product = require('./item.service');
const service = new Product();

class Payment {

  async getInfoProducts(dataProducts) {
    const productItems = [];
    for(let i=0; i<dataProducts.length; i++) {
      const product = await service.getSingleProduct(dataProducts[i].id);
      const amountProduct = parseInt(product[0].price.toString().replace('.',''), 10)
      const productFinal = {
        price_data: {
          product_data: {
            name: product[0].title
          },
          currency: 'usd',
          unit_amount: amountProduct // en céntimos
        },
        quantity: dataProducts[i].qty
      }
      productItems.push(productFinal)
    }
    return productItems;
  }

  async createSessionPayment(data) {
    console.log('data', data);
    const session = await stripe.checkout.sessions.create({
      line_items: await this.getInfoProducts(data),
      mode: 'payment',
      success_url: 'http://localhost:3000/success.html',
      cancel_url: 'http://localhost:3000/cancle.html'
    })
    return session;
  }
}

module.exports = Payment