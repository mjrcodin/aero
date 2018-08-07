const LocalStrategy = require('passport-local').Strategy
const db = require("../../models");

/**
 * Passport Local Strategy
 * @param {string} username
 * @param {string} password
 * @return {object} user
 * @return {object} error
 * @memberof authController
 */
const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
		db.User.findOne({ 
			where: {
				username: username 
			}
		})
		.then(user => {
			if (user === null) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	}
)

module.exports = strategy
