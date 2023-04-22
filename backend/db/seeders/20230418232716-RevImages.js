'use strict';
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'RevImages';
    await queryInterface.bulkInsert(options, [
      {
        url: 'thisIsAnImage.jpeg',
        reviewId: 1,
        userId: 1
      },
      {
        url: 'thisIsAlsoAnImage.jpeg',
        reviewId: 3,
        userId: 2
      },
      {
        url: 'Image.jpeg',
        reviewId: 2,
        userId: 1
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'RevImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
