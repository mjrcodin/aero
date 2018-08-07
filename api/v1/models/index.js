const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '..','..','..', 'config/config.json'))[env]
const db = {}

let createDB = (sequelize) => {
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
}

// TODO - Update for JawsDB on deployment
if (process.env.NODE_ENV=='production' && process.env.JAWSDB_URL) {
  let sequelize = new Sequelize(process.env.JAWSDB_URL)
  createDB(sequelize)
} else {
  let sequelize = new Sequelize(config.database, config.username, config.password, config)
  createDB(sequelize)
}



module.exports = db