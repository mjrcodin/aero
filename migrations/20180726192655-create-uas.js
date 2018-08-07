'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Uas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      registration_number: {
        type: Sequelize.STRING
      },
      uas_make: {
        type: Sequelize.STRING
      },
      uas_model: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      uas_description: {
        type: Sequelize.STRING
      },
      uas_status: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Uas');
  }
};