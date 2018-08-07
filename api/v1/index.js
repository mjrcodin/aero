
const router = require('express').Router()
const airportRoutes = require('./airport/airportRoutes')
const faaRoutes = require('./faa/faaRoutes')
const faaRequestRoutes = require('./faaRequest/faaRequestRoutes')
const operationRoutes = require('./operation/operationRoutes')
const stadiumRoutes = require('./stadium/stadiumRoutes')
const templateRoutes = require('./template/templateRoutes')
const uasRoutes = require('./uas/uasRoutes')
const userRoutes = require('./user/userRoutes')
const flightcontrol = require('./operation/flightControlRoutes')


// LAANC routes
router.use('/flightcontrol', flightcontrol)
router.use('/airport', airportRoutes)
router.use('/faa', faaRoutes)
// router.use('/faarequest', faaRequestRoutes)
router.use('/operation', operationRoutes)
router.use('/stadium', stadiumRoutes)
router.use('/template', templateRoutes)
router.use('/uas', uasRoutes)
router.use('/user', userRoutes)
router.use('/faar', faaRequestRoutes)

module.exports = router