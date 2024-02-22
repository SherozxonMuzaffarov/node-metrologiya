'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Metrology', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomi: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      soni: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ishlabChiqarilganYili: {
        type: Sequelize.INTEGER,
      },
      raqami: {
        type: Sequelize.STRING(250),
      },
      turi: {
        type: Sequelize.STRING(250),
      },
      ishi: {
        type: Sequelize.STRING(250),
      },
      saqlanishJoyi: {
        type: Sequelize.STRING(250),
      },
      serRaqamiSanasi: {
        type: Sequelize.STRING(250),
      },
      serBerganKorxona: {
        type: Sequelize.STRING(250),
      },
      sarflanganMablag: {
        type: Sequelize.STRING(250),
      },
      serKeyingiSanasi: {
        type: Sequelize.STRING(250),
      },
      serDavriyligi: {
        type: Sequelize.STRING(250),
      },
      shartnomaRaqamiSanasi: {
        type: Sequelize.STRING(250),
      },
      izoh: {
        type: Sequelize.STRING(250),
      },
      depo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('Metrology');
  }
};
