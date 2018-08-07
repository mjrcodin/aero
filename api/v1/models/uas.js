module.exports = (sequelize, DataTypes) => {
  const Uas = sequelize.define('Uas', {
    registration_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    uas_make: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    uas_model: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    uas_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    uas_status: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    tableName: 'uas',
    underscored: true,
    freezeTableName: true
  })

  return Uas
}