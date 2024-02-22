'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Dasturchi', 
        role: 'Admin',
        depo_id: 0,
        phone_number: '2057117',
        password: "$2a$08$V7QaTzXpi1QVUGqV4NnwAu//I5Pxu8OHZBCnVdyQtLLJEE7G/qOz.",
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
        'DELETE FROM Users WHERE name = ?',
        {replacements: ['Dasturchi']} 
      );
  }
};