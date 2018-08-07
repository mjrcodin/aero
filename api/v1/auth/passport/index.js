const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const db = require('../../models')

/**
* Saves user_id to req.session.passport.user
* @function
* @param {Object} req : req.session.passport.user = {id: user_id}
* @param {Object} res 
* @param {Object} next
* @memberof authController 
 */
passport.serializeUser((user, done) => {
	done(null, { id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	console.log('DeserializeUser called')
	db.User.findOne(
		{ id: id },
		'username',
		(err, user) => {
			if (err)
				done(err, null)
			done(null, user)
		}
	)
})

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport
