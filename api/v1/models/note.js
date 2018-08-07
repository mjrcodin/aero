module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    operation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    operation_note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'notes'
  })
  
  return Note
}