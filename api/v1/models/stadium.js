module.exports = (sequelize, DataTypes) => {
  var Stadium = sequelize.define('Stadium', {
    feature: DataTypes.JSON,
    last_modified: DataTypes.STRING

  }, {
    tableName: 'stadiums',
    underscored: true,
    freezeTableName: true
  })

  return Stadium
}