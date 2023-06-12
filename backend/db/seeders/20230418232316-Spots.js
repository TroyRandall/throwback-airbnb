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
        state: 'Massachusetts',
        country: 'United States of America',
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
        state: 'Massachusetts',
        country: 'United States of America',
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
        state: 'Massachusetts',
        country: 'United States of America',
        lat: 42.546594,
        lng: -71.473178,
        name: 'Tuna',
        description: 'Come here for that BIG TUNA kind of lifestyle!',
        price: 150.00
      },
      {
        ownerId: 1,
        address: "123 Main Street",
        city: "Boston",
        state: "MA",
        country: "USA",
        lat: 42.360102,
        lng: -71.056944,
        name: "Boston Bungalow",
        description: "A charming bungalow in the heart of Boston",
        price: 500000
      },
      {
        ownerId: 2,
        address: "456 Elm Street",
        city: "New York City",
        state: "NY",
        country: "USA",
        lat: 40.712784,
        lng: -74.005941,
        name: "New York City Apartment",
        description: "A spacious apartment in the heart of New York City",
        price: 1000000
      },
      {
        ownerId: 2,
        address: "789 Maple Street",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 34.052234,
        lng: -118.243689,
        name: "Los Angeles Villa",
        description: "A luxurious villa in the Hollywood Hills",
        price: 2000000
      },
      {
        ownerId: 3,
        address: "1010 Oak Street",
        city: "Chicago",
        state: "IL",
        country: "USA",
        lat: 41.875000,
        lng: -87.625000,
        name: "Chicago Townhouse",
        description: "A charming townhouse in the heart of Chicago",
        price: 750
      },
      {
        ownerId: 1,
        address: "1212 Pine Street",
        city: "San Francisco",
        state: "CA",
        country: "USA",
        lat: 37.775000,
        lng: -122.416667,
        name: "San Francisco Loft",
        description: "A spacious loft in the heart of San Francisco",
        price: 150
      },
      {
        ownerId: 1,
        address: "2323 Elm Street",
        city: "Austin",
        state: "TX",
        country: "USA",
        lat: 30.266667,
        lng: -97.750000,
        name: "Austin Bungalow",
        description: "A charming bungalow in the heart of Austin",
        price: 400
      },
      {
        ownerId: 2,
        address: "3434 Maple Street",
        city: "Seattle",
        state: "WA",
        country: "USA",
        lat: 47.600000,
        lng: -122.333333,
        name: "Seattle Condo",
        description: "A spacious condo in the heart of Seattle",
        price: 900
      },
      {
        ownerId: 3,
        address: "4545 Oak Street",
        city: "Denver",
        state: "CO",
        country: "USA",
        lat: 39.750000,
        lng: -104.916667,
        name: "Denver Townhouse",
        description: "A charming townhouse in the heart of Denver",
        price: 650
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
