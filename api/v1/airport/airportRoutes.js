const router = require('express').Router()
const airportController = require('./airportController')

// Matches with '/api/v1/airport'
router.route('/')
  .get(airportController.findAll)
  .post(airportController.create)

// Matches with '/api/v1/airport/:id'
router.route('/:id')
  .get(airportController.findById)
  .put(airportController.update)
  .delete(airportController.remove)

module.exports = router