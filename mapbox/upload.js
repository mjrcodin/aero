require('dotenv').load()
const fs = require('fs')
const AWS = require('aws-sdk')
const request = require('request')
const progress = require('request-progress')
const mbxUploads = require('@mapbox/mapbox-sdk/services/uploads');
const uploadsClient = mbxUploads({ accessToken: process.env.MAPBOX_API_KEY });
const faaData = require('./geoJSON')
const mapBoxUser = 'gitkendra' || process.env.MAPBOX_USER_NAME

/**
 * This code will update Mapbox geo files
 * 1. Download latest FAA file - getFile()
 * 2. Obtain AWS S3 credentials - getCredentials()
 * 2. Upload FAA file to AWS S3 - putFileOnS3()
 * 3. Upload to Mapbox
 */

const myObj = {
    faaFileUrl: '', 
    faaFileName: '', 
    faaFilePath: '',
    tileSet: '',
    credentials: {},
    awsPut: {}
}

let geojson = process.argv[2]
myObj.faaFileUrl = faaData.geoJson[geojson].url
myObj.faaFileName = faaData.geoJson[geojson].fileName
myObj.faaFilePath = faaData.geoJson[geojson].path
myObj.tileSet = faaData.geoJson[geojson].tileSet

/**
 * Download FAA file specified in process.argv[2]
 */
const getFile = () => {
    return new Promise((resolve, reject) => {
        progress(request(myObj.faaFileUrl), {
            throttle:500
        })
        .on('progress', function (state) {
            process.stdout.write('.');
        })
        .on('error', function (err) {
            reject('error :( '+err);
        })
        .on('end', function () {
            console.log('.' + `100% \n Download of ${myObj.faaFileName} Completed`);
            resolve('file downloaded')
        })
        .pipe(fs.createWriteStream(`./mapbox/faaFiles/${myObj.faaFileName}`));
    })
}
/**
 * Obtain AWS S3 API crendentials
 */
const getCredentials = () => {
    return uploadsClient
        .createUploadCredentials()
        .send()
        .then((response) => {
            Object.assign(myObj.credentials, response.body)
            return response.body
        });
}
/**
 * Upload file to AWS S3
 */
const putFileOnS3 = (credentials) => {
    const s3 = new AWS.S3({
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
        region: 'us-east-1'
    });
    return s3.putObject({
        Bucket: credentials.bucket,
        Key: credentials.key,
        Body: fs.createReadStream(myObj.faaFilePath)
    }).promise().then((result) => {
        Object.assign(myObj.awsPut, result)
    })
};
/**
 * Upload file to Mapbox from AWS s3
 */
const uploadMapBox = () => {
    uploadsClient
        .createUpload({
            mapId: `${mapBoxUser}.${myObj.tileSet}`,
            url: myObj.credentials.url
        })
        .send()
        .then(response => {
            const upload = response.body;
            Object.assign(myObj, upload)
            console.log('Upload to Mapbox from AWS started, run update to check status')
    });
}

/**
 * This code will update Mapbox geo files
 * 1. Download latest FAA file - getFile()
 * 2. Obtain AWS S3 credentials - getCredentials()
 * 2. Upload FAA file to AWS S3 - putFileOnS3()
 * 3. Upload to Mapbox
 */
getFile()
    .then(getCredentials)
    .then(putFileOnS3)
    .then(uploadMapBox)
    .catch(err=>console.log(err))