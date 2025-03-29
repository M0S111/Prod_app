'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        username: 'sohaib770@gmail.com',
        password: 'adminpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'msheharyar@gmail.com',
        password: 'clientpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'abidq2000@yahoo.com',
        password: 'otherclientpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null);
  }
};
