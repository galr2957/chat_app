'use strict';

const models = require('../../models');
const User = models.user
const Chat = models.Chat
const ChatUser = models.ChatUser
const Message = models.Message

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

     const chat = await Chat.create()   
     //const users = await User.findAll({ limit : 2})
         

         await ChatUser.bulkCreate([
           {
             chatId: chat.id,
             userId: 55
           },
           {
            chatId: chat.id,
            userId: 4
           }
         ])

         await Message.bulkCreate([
           {
             message: 'hello friend',
             chatId: chat.id,
             fromUserId: 55
           },
           {
            message: 'hello body',
            chatId: chat.id,
            fromUserId: 55
          },
          {
            message: 'hello sir long time no speak',
            chatId: chat.id,
            fromUserId: 4
          }
         ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
