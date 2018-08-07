module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    message: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    operator_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    operation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    notification_status: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    tableName: 'notifications'
  })

  return Notification
}