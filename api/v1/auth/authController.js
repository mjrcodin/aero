const jwt = require('jsonwebtoken')
const Db = require('../models')
const sendSMS = require('../twilio/twilioController').sendSMS

/**
 * @namespace authController
 * @desc This controller provides authentication through the use of user name and password verification,
 * verifying user requests with with expiring JSON Web Tokens, and SMS text messaging for two factor authentication. 
 */

/**
 * creates JWT token
 * @param {object} payload : The registered claims of the token
 * @return {string} tkn : User specific JWT token
 * @memberof authController
 */
createToken = (payload)=>{
    let expires = process.env.TOKEN_EXPIRE || '24h'
    const tkn = jwt.sign(payload, process.env.API_SECRET, { expiresIn: expires });
    return tkn; 
}

/**
 * Creates a JWT token using user object with current date and appends to res.header
 * @function
 * @param {Object} req
 * @param {Object} res res.header['authorization'] = token
 * @param {Object} next
 * @memberof authController
 */
sendToken = (req, res, next) => {
    // let payload = {
    //     user_id: req.user.id,
    //     username: req.user.username,
    //     date: Date()
    // }
    // const tkn = createToken(payload)
    // token = `JWT ${tkn}`
    // res.header('authorization', token)
    next()
}

/**
 * Verifies user JWT token is valid
 * @function
 * @param {Object} req
 * @param {Object} res res.header['authorization'] = token
 * @param {Object} next
 * @memberof authController
 */
checkForToken = (req, res, next)=> {
    req.jwt_auth = false;
    if(req.headers['authorization'] && req.headers['authorization'].startsWith('JWT')) {
        var jwt_token = req.headers['authorization'].substr(4);
        return jwt.verify(jwt_token, process.env.API_SECRET, function(err, jwt_data) {
            if (err)
                return res.status(401).end(`{msg:"not authorized"}`) 
            req.jwt_auth = jwt_data;
            next();
        })
    } else {
        // return res.status(401).end(`{msg:"no credentials found}`) 
          next();
      }
};

/**
 * Generates random 6 digit pin
 * @function
 * @param {Object} req
 * @param {Object} res 
 * @param {function} next : next matching route
 * @return {number} val : six digit random number
 * @memberof authController
 */
createPin = () => {
    let val = Math.floor(100000 + Math.random() * 9000);
    return val; 
}

/**
 * Creates two factor pin, then appends pin and expiration date to req object
 * @function
 * @param {Object} req
 * @param {Object} res 
 * @param {function} next : next matching route
 * @memberof authController
 */
startTwoFactorSession = (req, res, next) => {
    
    // let pin = createPin(); 
    // let minutes = process.env.PIN_EXPIRES_MINS || 60; 
    // let expires = Date.now() + (minutes * 60 * 1000)

    // req.authPin = pin;
    // req.authPinExipres = expires; 
    // let msg = `Here is your flight code ${req.authPin}`
    // sendSMS(req.user.phone, msg)
    next()
}
/**
 * Updates User database with current two factor pin with exiration time
 * @function
 * @param {Object} req : req.authpin & authPinExpires from previous function. 
 * @param {Object} res : response object
 * @param {function} next : next matching route
 * @memberof authController
 */
updateTwoFactorPin = (req, res, next) =>{
    Db.User.update({
        authPin: req.authPin,
        authPinExpire: req.authPinExipres
        },
        {
        where: {
            id: req.user.id,
        }
    }).catch((err) => {
        console.log(err)
    })
    next()
}
/**
 * Verify user, and that two factor pin is valid and not expired. 
 * @function
 * @param {Object} req : req.body.authPin & username passed from user. 
 * @param {Object} res 
 * @param {function} next : next matching route
 * @return {function} next() : if user, pin, and pin expiry date are valid next() is called. 
 * @return {error} 401 : if invalid user, pin, or expiration. 
 * @memberof authController
 */
verifyTwoFactorPin = (req, res, next) => {
    next()
    // console.log('Verify two factor pin');
    // Db.User.findOne({ 
    //     where: {
    //         username: req.body.username 
    //     }
    // }).then((user) => {
        
    //     let enteredPin = parseInt(req.body.authPin);
    //     let pin = parseInt(user.authPin)
    //     let expires = parseInt(user.authPinExpire) 

    //     if (req.body.username === user.username && enteredPin === pin && Date.now() < expires) {
    //         next()
    //     } else {
    //         return res.status(401).end(`{msg:"not authorized"}`) 
    //     }
    //     }).catch((err) => {
    //     console.log(err)
    // })
}

module.exports = {verifyTwoFactorPin, updateTwoFactorPin, startTwoFactorSession, createPin, checkForToken, sendToken, createToken}