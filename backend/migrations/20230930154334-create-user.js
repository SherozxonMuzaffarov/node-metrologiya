'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING(250),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      depo_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      role: {
        type: Sequelize.ENUM("Admin", 'User'),
        allowNull: false,
        defaultValue: "User"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};