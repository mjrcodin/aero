const passport = require('../auth/passport')
const db = require('../models')

module.exports = {

 /**
 * @namespace uasController
 * @desc This is a description of the controller
 */
    
    getUas (req, res) {
        res.json({'message':'getting uas'})
    },
    addUas (req, res) {
        let userResponse = 'Adding uas for user ' + req.body.user_id
        res.json({'message':userResponse})
    }
}