const router = require('express').Router()
const stadiumController = require('./stadiumController')

// Matches with '/api/v1/stadium'
router.route('/')
  .get(stadiumController.findAll)
  .post(stadiumController.create)

// Matches with '/api/v1/stadium/:id'
router.route('/:id')
  .get(stadiumController.findById)
  .put(stadiumController.update)
  .delete(stadiumController.remove)

module.exports = router