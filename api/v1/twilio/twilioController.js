require('dotenv').config()
const accountSid = process.env.TWILLIO_ACCOUNT_SID 
const authToken = process.env.TWILLIO_AUTH_TOKEN 
const twilio = require('twilio')
const client = new twilio(accountSid, authToken)

  /**
 * @namespace twilioController
 * @desc This is a description of the controller
 */
  
/**
 * Sends SMS text message utilizing the Twilio API

 * @function
 * @param {Object} req : req.userPHone The user's registered cell number recieving the message
 * @param {Object} res : response object
 * @param {function} next : next matching route
 * @param { string } process.env.TWILLIO_NUMBER : application phone number provided by Twilio
 * @memberof twilioController

 * @return null
 */
exports.sendSMS = (userPhone, message) => {
    return client.messages
        .create({
            body: message,
            from: process.env.TWILLIO_NUMBER,
            to: userPhone
        })
        .then(message => console.log(message.sid))
        .done(() => {
            console.log('SMS Sent')
        });
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