'use strict';
module.exports = (sequelize, DataTypes) => {
  var Log = sequelize.define('Log', {
    user_id: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.INTEGER
    },
    activity: DataTypes.JSON
  }, {
    underscored: true,
  });
  Log.associate = function(models) {
    // associations can be defined here
  };
  return Log;
};