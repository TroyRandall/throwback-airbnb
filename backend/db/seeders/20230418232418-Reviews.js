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
      },
      {
        userId: 2,
        spotId: 1,
        review: "The location was great and the host was very friendly. The apartment was clean and well-furnished. I would definitely stay here again.",
        stars: 5
        },
        {
        userId: 3,
        spotId: 2,
        review: "The apartment was very dirty when we arrived. The cleaner could have done a better job. I was not thrilled with the overall experience.",
        stars: 2
        },
        {
        userId: 2,
        spotId: 3,
        review: "The apartment was great! The location was perfect and the host was very responsive. I would definitely stay here again.",
        stars: 5
        },
        {
        userId: 3,
        spotId: 4,
        review: "The apartment was a bit small, but it was clean and well-furnished. The host was very friendly and helpful. I would definitely stay here again.",
        stars: 4
        },
        {
        userId: 1,
        spotId: 5,
        review: "The apartment was great! The location was perfect and the host was very responsive. I would definitely stay here again.",
        stars: 5
        },
        {
        userId: 1,
        spotId: 6,
        review: "The apartment was a bit dirty when we arrived, but the host cleaned it up for us. The location was great and the host was very friendly. I would definitely stay here again.",
        stars: 3
        },
        {
        userId: 3,
        spotId: 7,
        review: "The apartment was great! The location was perfect and the host was very responsive. I would definitely stay here again.",
        stars: 5
        },
        {
        userId: 8,
        spotId: 8,
        review: "The apartment was a bit small, but it was clean and well-furnished. The host was very friendly and helpful. I would definitely stay here again.",
        stars: 4
        },
        {
        userId: 2,
        spotId: 9,
        review: "The apartment was great! The location was perfect and the host was very responsive. I would definitely stay here again.",
        stars: 5
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
