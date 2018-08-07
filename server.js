require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
var fs = require('fs')
const morgan = require('morgan')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const db = require('./api/v1/models')
const env = process.env.NODE_ENV || 'development'
const passport = require('./api/v1/auth/passport')
const app = express()
const PORT = process.env.PORT || 3001
const path = require('path')
const rfs = require('rotating-file-stream')

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')))

// currentToken is the faa access token for the API OAuth
let currentToken = 'NotSet'
// fat is the file that obtains the current access token
// const setAccessToken = require('./scripts/fat')

// Route requires
const routes = require('./routes')

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json({urlencoded: true}))
// Attach the faa access token to requests
app.use(function (req, res, next) {
  req.faa_token = currentToken
  next()
})
// Morgan logging to file on a daily basis
// Reference: https://github.com/expressjs/morgan
var logDirectory = path.join(__dirname, 'log')
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

// Sessions
var options = require(path.join(__dirname, 'config/config.json'))[env];
var sessionStore = new MySQLStore(options, db.sequelize);

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Routes
app.use('/', routes)

// TODO - app.use and catch 404/500 errors elegantly

// Starting Server and database connection
db.sequelize.sync({force: false}).then(function() {
  console.log('sequelize linked!');
	app.listen(PORT, () => {
		console.log(`App listening on PORT: ${PORT}`)
	})
});

// Get the access token for FAA API
// setAccessToken((newToken) => {currentToken = newToken})
// Refresh the FAA token every 59 minutes and 55 seconds since it is only good for an hour
setInterval(()=> {setAccessToken()}, 3595000)
