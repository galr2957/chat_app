'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
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
         firstName: 'John',
         lastName: 'doe',
         email: 'johndoe@gmail.com',
         password: bcrypt.hashSync('secret' ,10),
         gender: 'male'
       },
       {
        firstName: 'gal',
        lastName: 'rechavam',
        email: 'galr2957@gmail.com',
        password: bcrypt.hashSync('galsecret' ,10),
        gender: 'male'
      },
      {
        firstName: 'mike',
        lastName: 'brant',
        email: 'mikebarant@gmail.com',
        password: bcrypt.hashSync('mikesecret' ,10),
        gender: 'male'
      },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('users', null, {});
  }
};
