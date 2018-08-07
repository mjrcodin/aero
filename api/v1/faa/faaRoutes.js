const router = require('express').Router()
const faaController = require('./faaController')

// // Matches with '/api/v1/faa'
// router.route('/')
//   .get(faaController.findAll)
//   .post(faaController.create);

// Matches with '/api/v1/faa/nearby'
router.route('/nearby')
  .post(faaController.findNearby); 

module.exports = router;