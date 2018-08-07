const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '..','..','..', 'config/config.json'))[env]
const db = {}

let Database = process.env.SEQUEL_DB || config.database
let userName = process.env.SEQUEL_USERNAME || config.username
let Database = process.env.SEQUEL_PASSWORD || config.password
// TODO - Update for JawsDB on deployment
let sequelize = new Sequelize(config.database, config.username, config.password, config)

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Uas.belongsTo(db.User)
db.User.hasMany(db.Uas, {
  foreignKey: 'user_id'
})

module.exports = db