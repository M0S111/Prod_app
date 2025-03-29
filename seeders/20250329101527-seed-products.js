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
    await queryInterface.bulkInsert('products', [
      {
        name: 'Laptop',
        price: 1199.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Drone',
        price: 899.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Smartphone',
        price: 399.00,
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
    await queryInterface.bulkDelete('products', null);
  }
};
