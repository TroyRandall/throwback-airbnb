'use strict';
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        url: 'imAnImage.jpeg',
        spotId: 1,
        userId: 1,
        preview: false
      },
      {
        url: 'imAlsoAnImage.jpeg',
        spotId: 2,
        userId: 1,
        preview: true
      },
      {
        url: 'guessWhatIam.jpeg',
        spotId: 3,
        userId: 2,
        preview: false
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
