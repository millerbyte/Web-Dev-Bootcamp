var faker = require('faker');

var products = {};

console.log('================\n'+
  'WELCOME TO MY SHOP!\n'+
  '================');

for(var i = 0; i < 10; i++){
  products[i] = {
    product: faker.fake("{{commerce.productName}}"),
    price: faker.fake("{{commerce.price}}")
  }
  console.log(`${products[i].product} - $${products[i].price}`);
}
