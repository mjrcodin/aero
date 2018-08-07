const router = require('express').Router()
const faaRequestController = require('./faaRequestController.js')

// Just a test to make sure the token is working for /api/v1/faar
router.route('/')
.get(faaRequestController.getAccessToken)

module.exports = router