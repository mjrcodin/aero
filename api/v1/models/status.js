module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    operation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    current_status: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'status'
  })

  return Status
}