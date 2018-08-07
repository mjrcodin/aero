const db = require('../models')
const api = require('../../../scripts/api')

module.exports = {

  /**
 * @namespace stadiumController
 * @desc This is a description of the controller
 */
  
  findAll: function(req, res) {
    console.log("\x1b[35m #######################");
    console.log("findAll /api/v1/stadium")
    // res.json({
    //   message: 'findAll /api/v1/stadium',
    //   status: true,
    //   data: null
    // })

    db.Stadium.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findById: function(req, res) {
    console.log("\x1b[35m #######################");
    console.log("findById /api/v1/stadium")
    res.json({
      message: 'findById /api/v1/stadium',
      status: true,
      data: null
    })

    // db.Stadium.findById(req.params.id)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err))
  },
  create: function(req, res) {
    console.log("\x1b[35m #######################");
    console.log("create /api/v1/stadium")
    // res.json({
    //   message: 'create /api/v1/stadium',
    //   status: true,
    //   data: null
    // })

    // api call to retrieve stadium
    api.getStadiums()
      .then(function(response){
        console.log('stadiums retrieved from faa api')
        // Stringify and parse faa data resposne to conform to JSON standards
        // let stadiums = JSON.parse(JSON.stringify(response.data))
        let stadiums = response.data
  
        // Add to database
        return db.Stadium.findOrCreate({
          where: {
            last_modified: response.headers['last-modified']
          }, 
          defaults: {
            feature: stadiums,
            last_modified: response.headers['last-modified']
          }
        })
        .spread((dbStadiums, created) => {
          if(created){
            console.log('Stadium %s added', dbStadiums.id)
            return res.json({
              last_modified: response.headers['last-modified'],
              message: 'Created new Stadium.',
              status: true,
              data: dbStadiums
            })
          }
          console.log('Stadium %s already exists', dbStadiums.id)
          return res.json({
            last_modified: response.headers['last-modified'],
            message: response.statusText,
            status: true,
            data: dbStadiums
          })
        })
        .catch(err => {
          console.log(err)
          return res.json({
              message: 'oops... findOrCreate went wrong',
              status: false,
              data: null
          })
      })
    })
    .catch(function (error) {
      console.log('Error', error)
      return res.json({
        message: 'oops... getStadiums() went wrong',
        status: false,
        data: null
      })
    })
  },
  update: function(req, res) {
    console.log("\x1b[35m #######################");
    console.log("update /api/v1/stadium")

    res.json({
      message: 'update /api/v1/stadium',
      status: true,
      data: null
    })
    
    // db.Stadium.findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err))
  },
  remove: function(req, res) {
    console.log("\x1b[35m #######################");
    console.log("remove /api/v1/stadium")

    res.json({
      message: 'remove /api/v1/stadium',
      status: true,
      data: null
    })
    
    // db.Stadium.findById({ _id: req.params.id })
    //   .then(dbModel => dbModel.remove())
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err))
  }
}