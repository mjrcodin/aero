const router = require('express').Router()
const operationController = require('./operationController')


/** Express router providing user related routes
 * @namespace routeAPIV1Operation
 */


// Matches with '/api/v1/operation'
router.route('/')
  .get(operationController.findAll)
  .post(operationController.create)

// Matches with '/api/v1/operation/:id'
router.route('/:id')
  .get(operationController.findById)
  .put(operationController.update)
  .delete(operationController.remove)

module.exports = router