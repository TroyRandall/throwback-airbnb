'use strict';
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '04-17-2023',
        endDate: '04-18-23',

      },
      {
        spotId: 2,
        userId: 2,
        startDate: '04-17-2023',
        endDate: '04-20-23',

      },
      {
        spotId: 1,
        userId: 3,
        startDate: '04-19-2023',
        endDate: '04-22-23',

      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
