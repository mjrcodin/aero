
const db = require('../models')

module.exports = {
    /**
     * Description
     * @param 
     * @return {string} Body
     */
    getAccessToken(req, res) {
      console.log('Found me')
      console.log(req)
      db.Log.create({user_id:null, activity: "FAA Token Shown"}).then(() => {
        res.json({access_token: req.faa_token})
      })
    }

// // const faaKeys = require('../../../../config/keys/faaKeys.json')
/**
 * @namespace faaRequestController
 * @desc This is a description of the controller
 */
// const {
//     faa_staging_url,
//     faa_access_token
// } = faaKeys.FAA
// const request = require("request");


// if (process.env.NODE_ENV !== 'local') {
//     faa_staging_url = process.env.faa.staging_url,
//         faa_access_token = process.env.faa.access_token
// }

// module.exports = {
//     /**
//      * Description
//      * @param 
//      * @return {string} Body
//      */

//     getIdToken(req, res) {
//         let options = {
//             method: 'POST',
//             url: faa_staging_url + '/oauth/token',
//             headers: {
//                 access_token: faa_access_token,
//                 'Cache-Control': 'no-cache',
//                 Authorization: 'Basic WVRJM09UTmtOak10WVdWa015MDBNelUyTFRsaU9UZ3RZalEyTkdJd01HRm1ZVFJqOk1UQm1NR1U0TURBdE1UVmxNeTAwTVRWakxXRTBZakV0TlRjNE1HWTBOak16TjJNMQ==',
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             form: {
//                 grant_type: 'client_credentials'
//             }
//         }

//         request(options, function (error, response, body) {
//             if (error) throw new Error(error)
//             // Test Auto Auth
//             let newAuth = 'Bearer ' + JSON.parse(body).access_token
//             let authOptions = {
//                 method: 'POST',
//                 url: faa_staging_url + '/api/ext/v2/107/autoauthorization',
//                 headers: {
//                     'Cache-Control': 'no-cache',
//                     Authorization: newAuth,
//                     'Content-Type': 'application/json',
//                     Accept: '*/*'
//                 },
//                 body: {
//                     "type": "FeatureCollection",
//                     "features": [{
//                         "type": "Feature",
//                         "geometry": {
//                             "type": "Polygon",
//                             "coordinates": [
//                                 [
//                                     [-149.89282608032227,
//                                         61.13934117858578
//                                     ],
//                                     [-149.8978042602539,
//                                         61.135778096042124
//                                     ],
//                                     [-149.89480018615723,
//                                         61.130681360687916
//                                     ],
//                                     [-149.87265586853027,
//                                         61.13138583650506
//                                     ],
//                                     [-149.8714542388916,
//                                         61.13871973964429
//                                     ],
//                                     [-149.89282608032227,
//                                         61.13934117858578
//                                     ]
//                                 ]
//                             ]
//                         },
//                         "properties": {
//                             "airspaceClassCodes": ["C"],
//                             "facility": "ANC",
//                             "operationID": "",
//                             "operationDuration": "30",
//                             "operationMaxAltitude": "100",
//                             "operationStartDateTime": "2018-09-17 20:18",
//                             "pocFirstName": "first-name",
//                             "pocLastName": "last-name",
//                             "pocPhoneNumber": "1234567890",
//                             "registrationNumbers": null,
//                             "facilityMaps": [{
//                                     "globalId": "57ed1c3f-f7c2-4334-b95a-02bffa7e3f70",
//                                     "lastEditDate": "2017-08-14"
//                                 },
//                                 {
//                                     "globalId": "77d1ba90-981b-4300-800a-0b72633939f8",
//                                     "lastEditDate": "2017-08-14"
//                                 }
//                             ]
//                         }
//                     }]
//                 },
//                 json: true
//             }

//             request(authOptions, function (error, response, body) {
//                 if (error) throw new Error(error)
//                 console.log(body)
//             })
//             res.send(body)
//         })
//     }
} 