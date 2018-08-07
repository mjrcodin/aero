const db = require('../models')

exports.register = (req, res, next)=>{
    console.log('user signup')
 const { username, password, phone } = req.body
 // ADD VALIDATION
 db.User
   .findOrCreate({
     where: {
       username: username
     },
     defaults: {
       username: username,
       password: password,
       phone: phone
     }
   })
   .spread((user, created) => {
       if (created) {
         req.user = user
     } else {
       res.json({
         error: `Sorry, already a user with the username: ${username}`
       })
     }
     }).catch((err) => {
       console.log(err)
   })
}
exports.logout = (req, res, next) => {
    //TODO - logic does nothing
    if (req.user) {
        req.logout()
        res.send({
          msg: 'logging out'
        })
      } else {
        res.send({
          msg: 'no user to log out'
        })
      }
}
exports.getUsers = (req, res, next) => {
    //TODO - logic does nothing
    if (req.user) {
        res.send(null)
      } else {
        res.json({
          user: null
        })
      }
}
exports.getProfile = (req, res)=> {

        res.json({
            'message': 'getting user'
        })
    },
exports.addUas = (req, res)=>{
        // user_id is a parameter, uas fields are posted in the body
        let uasObj = {
            registration_number: req.body.registration_number,
            uas_make: req.body.uas_make,
            uas_model: req.body.uas_model,
            color: req.body.color,
            uas_description: req.body.uas_description,
            uas_status: req.body.uas_status,
            user_id: parseInt(req.params.id)
        }
        console.log(uasObj)
        db.Uas.create(uasObj).then(newUas => {
            res.json({
                'message': 'adding uas',
                'uas_id': newUas.id
            })
        })
    }
