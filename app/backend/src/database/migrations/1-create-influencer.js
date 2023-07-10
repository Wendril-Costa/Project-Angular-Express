'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('influencers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numberSubscribers: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      platform: {
        allowNull: false,
        type: Sequelize.STRING
      },
      channelName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nickName: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    },
    {
      timestamps: false
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('influencers')
  }
}
