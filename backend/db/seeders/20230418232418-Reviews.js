'use strict';
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        review: 'this place was highly clean and very cozy. would stay here again',
        stars: 4
      },
      {
        userId: 1,
        spotId: 2,
        review: 'I enjoyed the cozy log cabin feel of this old home.',
        stars: 5
      },
      {
        userId: 2,
        spotId: 3,
        review: 'It was very dirty when we arrived. cleaner could have done a better job, was not thriller with the overall experience',
        stars: 2
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
