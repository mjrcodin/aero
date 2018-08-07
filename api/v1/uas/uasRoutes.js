const router = require('express').Router()
const uasController = require('./uasController.js')

// Matches with '/api/v1/uas'
router.route('/:id')
.get(uasController.getUas)
.post(uasController.addUas)

module.exports = router