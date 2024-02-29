'use strict';

const faker = require('faker');
const fakeData = function (countItem) {
  const data = []
  for (let k = 0; k < countItem; k++) {
    let items = {
      name: faker.commerce.productName(),
      status: faker.random.arrayElement([0,1])
    }
    data.push(items)
  }
return data
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {

  
  async up(queryInterface, Sequelize) {
    const items=fakeData(100);
    await queryInterface.bulkInsert('Categories',items , {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});

  }
};


