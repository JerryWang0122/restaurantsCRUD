'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const restaurants = require('../public/jsons/restaurant.json').results
    await queryInterface.bulkInsert('Restaurants', 
      restaurants.map(rest => 
        ({
          ...rest,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      )
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null)
  }
};
