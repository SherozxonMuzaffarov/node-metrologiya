"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Depos", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(250),
                allowNull: false,
            },
            region_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            depo_boss_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            depo_sklad_xodim_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
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
        await queryInterface.dropTable("Depos");
    },
};
