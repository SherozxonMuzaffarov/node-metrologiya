"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const regions = [
            {
                name: "Andijon",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Buxoro",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Jizzax",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Navoiy",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Namangan",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Samarqand",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Sirdaryo",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Surxondaryo",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Toshkent",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Xorazm",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Farg'ona",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Qoraqalpog'iston Respublikasi",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        ];

        await queryInterface.bulkInsert("Regions", regions, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Regions", null, {});
    },
};
