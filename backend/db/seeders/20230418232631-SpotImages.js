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
      },
      {
        url: 'https://lp-cms-production.imgix.net/2022-02/USA%20Santa%20Barbara%20George%20Rose%20GettyImages-534429536%20RM.jpg?auto=format&w=1440&h=810&fit=crop&q=75',
        spotId: 3,
        userId: 3,
        preview: true
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
