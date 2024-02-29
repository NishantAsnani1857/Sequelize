'use strict';

const faker = require('faker');
const fakeData = function (countItem) {
  const data = []
  for (let k = 0; k < countItem; k++) {
    let items = {
      name: faker.commerce.productName(),
      description: `This is test content for product ${k + 1}`,
      amount: faker.commerce.price(),
      status: faker.random.arrayElement(["active","inactive"])
    }
    data.push(items)
  }
return data
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items=fakeData(100)
    await queryInterface.bulkInsert('Products',items,{});

  },

  async down(queryInterface, Sequelize) {


    await queryInterface.bulkDelete('Products', null, {});

  }
};





