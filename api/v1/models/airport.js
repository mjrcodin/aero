module.exports = (sequelize, DataTypes) => {
  var Airport = sequelize.define('Airport', {
    feature: DataTypes.JSON,
    last_modified: DataTypes.STRING,
    active: {type: DataTypes.BOOLEAN, defaultValue: true}
  }, {
    tableName: 'airports',
    underscored: true,
    freezeTableName: true
  });

  return Airport
};