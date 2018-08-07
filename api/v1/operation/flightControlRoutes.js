const router = require('express').Router()
const { createPlan, updatePlan, getAllByUser, getOneById } = require('./flightcontrolController')
const checkToken = require('../auth/authController').checkForToken

/** Express router providing user related routes
 * @namespace routeAPIV1Flightplan
 */


// Matches with '/api/v1/flightplan'
router
    .post('/:userId', checkToken, createPlan)
    .post('/:userId/:planId', checkToken,updatePlan)
    .get('/:userId', checkToken, getAllByUser)
    .get('/:userId/:planId', checkToken, getOneById)

module.exports = router