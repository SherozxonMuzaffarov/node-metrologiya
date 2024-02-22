"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Metrology_sklad", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nomi: {
                type: Sequelize.STRING(250),
                allowNull: false,
            },
            soni: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            ishlabChiqarilganYili: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            raqami: {
                type: Sequelize.STRING(250),
                allowNull: false,
            },
            turi: {
                type: Sequelize.STRING(250),
                allowNull: false,
            },
            ishi: {
                type: Sequelize.STRING(250),
                allowNull: false,
            },
            izoh: {
                type: Sequelize.STRING(250),
                allowNull: false,
            },
            depo_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },  
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Metrology_sklad");
    },
};
