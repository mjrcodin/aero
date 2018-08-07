const router = require('express').Router()
const userController = require('./userController.js')
const passport        = require('../auth/passport')
const db              = require("../models")
const register        = require('./userController').register;
const logout          = require('./userController').logout;
const getUsers        = require('./userController').getUsers;
const sendToken       = require('../auth/authController').sendToken; 
const startTwoFactor  = require('../auth/authController').startTwoFactorSession; 
const updatePin       = require('../auth/authController').updateTwoFactorPin; 
const checkToken      = require('../auth/authController').checkForToken; 
const verifyPin       = require('../auth/authController').verifyTwoFactorPin; 
const sendSMS = require('../twilio/twilioController').sendSMS; 

// API route '/api/v1/user'
router.route('/')
.get(userController.getProfile)

// API route '/api/v1/user/{id}/uas'
// Registration number format https://www.faa.gov/licenses_certificates/aircraft_certification/aircraft_registry/forming_nnumber/
router.post('/:id/uas', userController.addUas)


router
    .post('/logout', (req, res, next) => {
        res.json({
            message: 'Logged Out'
        })  
    })
    router
    .get('/', getUsers, (req, res, next) => {
      //TODO logic does nothing
    })
    .post('/', register, (req, res,next) => {
      res.json(req.user)
    })
    .post('/login', passport.authenticate('local'), sendToken, startTwoFactor, updatePin, (req, res, next) => {
      res.send({user_id: req.user.id, username: req.user.username})
    })
    .post('/pin', checkToken, verifyPin, (req, res, next) => {
      res.json({'msg':'happy flying'})
    })
    .post('/logout', logout, (req, res) => {
      //TODO logic does nothing
    })

module.exports = router