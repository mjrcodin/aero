const bcrypt = require('bcrypt-nodejs')

module.exports = (sequelize,DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(150),
      unique: true
    },
    phone: {
      type: DataTypes.STRING(150)
    },
    authPin: {
      type: DataTypes.STRING(150)
    },
    authPinExpire: {
      type: DataTypes.STRING(150)
    }
  }, {
    tableName: 'users',
    underscored: true,
    freezeTableName: true
  })

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  }
  User.hook('beforeCreate', function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
  })

  return User
}
