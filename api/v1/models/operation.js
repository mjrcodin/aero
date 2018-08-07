module.exports = (sequelize, DataTypes) => {
  const Operation = sequelize.define('Operation', {
    uas_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    operator_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    operation_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    start_date_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    maximum_altitude: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    area_of_operations: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'operations'
  })

  return Operation
}