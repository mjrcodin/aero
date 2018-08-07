const db = require('../models')
const api = require('../../../scripts/api')

module.exports = {
  findAll: function(req, res) {
    console.log("\x1b[35m #######################");
    console.log("findAll /api/v1/airport")

    // res.json({
    //   message: 'findAll /api/v1/airport',
    //   status: true,
    //   data: null
    // })

    db.Airport.findAll({where: {active: true}})
      .then(dbModel => {
        console.log('all active airports:')
        console.log(JSON.stringify(dbModel));
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err))
  },
  findById: function(req, res) {
    console.log("\x1b[35m #######################");
    console.log("findById /api/v1/airport")


    // res.json({
    //   message: 'findById /api/v1/airport',
    //   status: true,
    //   data: null
    // })

    db.Airport.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  create: function(req, res) {
    console.log("\x1b[35m #######################");
    console.log("create /api/v1/airport")


    // res.json({
    //   message: 'create /api/v1/airport',
    //   status: true,
    //   data: null
    // })
    // api call to retrieve Airport
    api.getAirports()
    .then(response => {
      console.log('airports retrieved from faa api')
      const date = response.headers['last-modified']
      console.log(date)

      // Create the airports according to Aiport model
      let airports = response.data.features.map(airport => {
        return {
          feature: airport,
          last_modified: date
          }
      })
      // Add the large set of data to database in chunks
      db.Airport.bulkCreate(airports.slice(0,4000))
      .then(() => db.Airport.bulkCreate(airports.slice(4000,8000)))
      .then(() => db.Airport.bulkCreate(airports.slice(8000,12000)))
      .then(() => db.Airport.bulkCreate(airports.slice(12000,16000)))
      .then(() => db.Airport.bulkCreate(airports.slice(16000,airports.length+1)))
      .then(() => {
        console.log('Bulk creation complete')
        return res.json({
          message: 'success... bulkCreate complete',
          status: true,
          data: null
        })
      })
      .catch(err => {
        // console.log(err)
        return res.json({
            message: 'oops... bulkCreate went wrong',
            status: false,
            data: err.name
        })
      })
    })
    .catch(function (error) {
      console.log(error)
      return res.json({
        message: 'oops... getAirports() went wrong',
        status: false,
        data: null
      })
    })
    // db.Book.create(req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err))
  },
  update: function(req, res) {
    console.log("\x1b[35m #######################");
    console.log("update /api/v1/airport")

    res.json({
      message: 'update /api/v1/airport',
      status: true,
      data: null
    })
    
    // db.Airport.findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err))
  },
  remove: function(req, res) {
    console.log("\x1b[35m #######################");
    console.log("remove /api/v1/airport")

    res.json({
      message: 'remove /api/v1/airport',
      status: true,
      data: null
    })
    
    // db.Airport.findById({ _id: req.params.id })
    //   .then(dbModel => dbModel.remove())
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err))
  }
}