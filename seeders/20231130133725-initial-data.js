'use strict';
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let transaction
    try {
      transaction = await queryInterface.sequelize.transaction()
      const hash = await bcrypt.hash('12345678', 10)
      await queryInterface.bulkInsert('Users', 
        Array.from({ length: 2 }).map((_, i) => 
          ({
            id: i + 1,
            name: `user${i + 1}`,
            email: `user${i + 1}@example.com`,
            password: hash,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        ), { transaction })
      
      const restaurants = require('../public/jsons/restaurant.json').results
      await queryInterface.bulkInsert('Restaurants', 
        restaurants.map((rest, i) => {
          const userId = i < 3 ? 1 : 2
          return {
            ...rest,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }), { transaction })

      await transaction.commit()
    } catch (error) {
      if (transaction) transaction.rollback()
    }

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
  }
};
