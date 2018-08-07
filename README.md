aero-laanc

## Get Started
1. Use `git clone` to clone repo to your computer in CLI
2. Use `cd aero-laanc` to change directory to aero-laanc
3. Use `npm install` to install dependencies
4. Create MySQL database named *_aeronyde*
5. Edit *config/config.js* to match your database username, password, and port if necessary
6. Use `export NODE_ENV=development` to set your environment to development. Confirm setting using `echo $NODE_ENV`
7. Use `npm start` to run the project

## Unit Testing
Tests are setup to use Mocha with the Chai assertion library. Tests are located in the ./test directory. 
```bash
#run mocha tests in ./test directory
$ npm test
```
## Route Docs
Flight Plan Routes
https://documenter.getpostman.com/view/4459856/RWTiveMd

## Update Mapbox geo JSON files 

Run one of the below scripts to obtain an update locally and on Mapbox to the defined tile set, run from the root ./ directory . 
```bash
#path: ./mapbox/faaFiles/National_Security_UAS_Flight_Restrictions.geojson
#tileSet: frz
$ npm run geo:nsurf
```
```bash
#path: ./faaFiles/FAA_UAS_Facility_Map_Data_V2.geojson
#tileSet: facility_map
$ npm run geo:uasfm
```
```bash
#path: ./faaFiles/FAA_UAS_Facility_Map_Data_V2.geojson
#tileSet: facility_map_label
$ npm run geo:uasfm2
```
```bash
#path: ./mapbox/faaFiles/Airports.geojson
#tileSet: airports
$ npm run geo:airports
```
```bash
#path: ./mapbox/faaFiles/Stadiums.geojson
#tileSet: Stadiums
$ npm run geo:stadiums
```
```bash
#path: ./mapbox/faaFiles/Class_Airspace.geojson
#tileSet: class_airspace
$ npm run geo:classairspace
```
```bash
#Get current statuses of files being upload to Map Box from AWS
$ npm run geo:status
```

## Logging
**Http Logs** are accomplished at the http request level using Morgan. Log files are in /log/access.log

**Activity Logs** are maintained in the database log table. All activity should be logged using the user_id and a string to describe the activity.  The user_id may be null when the user_id is not known.  Activity is a JSON field for future expansion but may be a simple string for now.
Example:
`db.Log.create({user_id:null, activity: "FAA Token Shown"}).then()`
NOTE - Make sure you have required the models in all files using the log `const db = require('../models')`

## Generate API Documentation 
Current configuration utilizes the documentation.js pacakage that uses comments in the code to generate docs
docs are located in the ./docs folder, open index.html after running the below script. 

```bash
npm run docs
```

## Continuous Integeration Testing
The pre-push NPM package was utilized to modify ```.git/webhooks``` so it will look at the prepush section of the scripts in ```Package.json```. The scripts in this section will run ***prior to any push to Github***, currently Mocha tests are being run, if the test fails your push to Github will fail. Tests are currently minimal in nature but in the future Unit and E2E tests can be added to the ```./test``` directory for CI.  

