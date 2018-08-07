'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Operations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uas_id: {
        type: Sequelize.INTEGER
      },
      operator_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      operation_description: {
        type: Sequelize.STRING
      },
      start_date_time: {
        type: Sequelize.DATE
      },
      duration: {
        type: Sequelize.INTEGER
      },
      maximum_altitude: {
        type: Sequelize.INTEGER
      },
      area_of_operations: {
        type: Sequelize.JSON
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
    return queryInterface.dropTable('Operations');
  }
};