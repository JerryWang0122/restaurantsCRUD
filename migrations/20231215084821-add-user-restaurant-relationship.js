'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Restaurants', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      // allowNull: false,  // 注意這邊還不能設這個，會讓現有資料爆掉，須先手動設定
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Restaurants', 'userId')
  }
};
