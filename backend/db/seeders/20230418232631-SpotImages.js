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
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbSfHIhXGbNh6e3BblSXmN4SKJSG5EF1Dm2NcIFJ3lRAdEFhwjqWxMgW3j3Z1zkpbKq8RzBU7iF2o&usqp=CAU&ec=48665699',
        spotId: 1,
        userId: 1,
        preview: false
      },
      {
        url: 'https://cdn.onekindesign.com/wp-content/uploads/2022/06/Historic-Shingle-Style-House-Massachusetts-SV-Design-01-1-Kindesign.jpg',
        spotId: 2,
        userId: 1,
        preview: true
      },
      {
        url: 'https://www.vvdailypress.com/gcdn/presto/2022/06/08/NVIC/27b67d45-20b3-44af-bb4e-e4a1c56b27a0-P1360265_2.JPG',
        spotId: 3,
        userId: 2,
        preview: false
      },
      {
        url: 'https://lp-cms-production.imgix.net/2022-02/USA%20Santa%20Barbara%20George%20Rose%20GettyImages-534429536%20RM.jpg?auto=format&w=1440&h=810&fit=crop&q=75',
        spotId: 3,
        userId: 3,
        preview: true
      },{
        url: "https://picsum.photos/id/1/200/200",
        spotId: 1,
        userId: 1,
        preview: true
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/6ff52c16-0ec5-4725-b69c-a9d8ecd818e7-1.MichiganMansions.jpg",
        spotId: 2,
        userId: 2,
        preview: true
      },
      {
        url: "https://as1.ftcdn.net/v2/jpg/03/66/60/68/1000_F_366606804_WORN4uDdGawIa21yrtRAzQWoqtndKsXh.jpg",
        spotId: 3,
        userId: 2,
        preview: true
      },
      {
        url: "https://www.boredpanda.com/blog/wp-content/uploads/2022/05/Victorian-house-in-Cleveland-60f624c056d86-62824be0ad08d__700.jpg",
        spotId: 4,
        userId: 1,
        preview: true
      },
      {
        url: "https://thumbor.bigedition.com/historic/qzx0tOfXenuOvKAiaQz2osfxfMQ=/800x0/filters:quality(80)/granite-web-prod/9c/54/9c54a4ea02fe46d4ad4eca6633d2e881.png",
        spotId: 5,
        userId: 2,
        preview: true
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzDG8JqcaEySeC8epHrKHfB9j7--XIOOSKitXPapsXYw&usqp=CAU&ec=48665699",
        spotId: 6,
        userId: 2,
        preview: true
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/e610def2-1a2a-486f-9a42-1b2b1dab07f1-gorgeous-gilded-age-homes-for-sale-bowery-street.jpg",
        spotId: 7,
        userId: 3,
        preview: true
      },
      {
        url: "https://betweennapsontheporch.net/wp-content/uploads/2021/11/Beautiful-Historical-Old-Homes-11.jpg",
        spotId: 8,
        userId: 1,
        preview: true
      },
      {
        url: "https://i.insider.com/59e77f3f49e1cf37008b45eb?width=750&format=jpeg&auto=webp",
        spotId: 9,
        userId: 1,
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
