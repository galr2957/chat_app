'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        defaultValue: 'text'
      },
      message: {
        type: Sequelize.TEXT
      },
      chatId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Chats', 
          Key: 'id'
        },
        onDelete : 'CASCADE'
      },
      fromUserId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'users', 
          Key: 'id'
        },
        onDelete : 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};