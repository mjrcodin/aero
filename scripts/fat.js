// faaKeys faa_staging_url and faa_access_token are used in conjunction with faaKeys.json for local operations.  The .env file for local development is .gitignored and only available through direct, secure communications.
const faa_staging_url = process.env.FAA_URL
const faa_access_token = process.env.FAA_ACCESS_TOKEN
const request = require("request")

function setAccessToken(cb) {
  let currentToken = 'NotSet'
  let options = {
    method: 'POST',
    url: faa_staging_url + '/oauth/token',
    headers: {
      access_token: faa_access_token,
      'Cache-Control': 'no-cache',
      Authorization: 'Basic WVRJM09UTmtOak10WVdWa015MDBNelUyTFRsaU9UZ3RZalEyTkdJd01HRm1ZVFJqOk1UQm1NR1U0TURBdE1UVmxNeTAwTVRWakxXRTBZakV0TlRjNE1HWTBOak16TjJNMQ==',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      grant_type: 'client_credentials'
    }
  }
  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    currentToken = JSON.parse(body).access_token
    cb(currentToken)
  })
}

module.exports = setAccessToken