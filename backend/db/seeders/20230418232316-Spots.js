'use strict';
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '410 great road',
        city: 'Littleton',
        state: 'MA',
        lat: 42.546594,
        lng: -71.473178,
        name: 'Dolphin',
        description: 'Warm, Smart, Intelligent living space',
        price: 450.00
      },
      {
        ownerId: 2,
        address: '27 freedom trail',
        city: 'Littleton',
        state: 'MA',
        lat: 42.546594,
        lng: -71.473178,
        name: 'Shark',
        description: 'This place has the ferocity of a sharks bite!!',
        price: 1150.00
      },
      {
        ownerId: 3,
        address: '492 Nagoghill road',
        city: 'Littleton',
        state: 'MA',
        lat: 42.546594,
        lng: -71.473178,
        name: 'Tuna',
        description: 'Come here for that BIG TUNA kind of lifestyle!',
        price: 150.00
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
