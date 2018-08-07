const db = require('../models');
var turf = require('@turf/turf');

/**
 * @namespace faaController
 * @desc This is a description of the controller
 */
module.exports = {
  findNearby: function(req, res) {
    console.log("\x1b[35m #######################");
    console.log("findNearby /api/v1/faa/nearby")
    // res.json({
    //   message: "findNearby /api/v1/faa/nearby",
    //   status: true,
    //   data: null
    // });

    let results = {
      airports_nearby: [],
      stadiums_nearby: []
    };
    console.log("@@@@@@@@@@@@ req.body")
    console.log(JSON.stringify(req.body, null, 2));
    // Get stadiums and airports from db
    // TODO: only retrieve most recent stadium file!!
    Promise.all([
      db.Airport.findAll({
        where: {
          active: true
        }
      }),
      db.Stadium.findAll({})
    ]).then((data) => {
      // Convert airport to a feature collection to send into findNearby
      const dbAirports = data[0].map(dbAirport => dbAirport.dataValues.feature);
      const airportCollection = turf.featureCollection(dbAirports);
      const dbStadiumCollection = data[1][0].dataValues.feature;
      // calculate which stadiums and airports are nearby
      console.log("find airports");
      findNearby(dbStadiumCollection, req.body.feature, 3, stadiums => {
        console.log("find stadiums")
        return findNearby(airportCollection, req.body.feature, 5,  airports => {
          console.log(airports);
          console.log(stadiums);
          results.airports_nearby = airports;
          results.stadiums_nearby = stadiums;
          res.json(results);
        });
      });
    }).catch((err) => console.log(err))
  }
};

// Takes in two geojson feature(s). Converts geojson polygons to lines in order to use turf.pointToLienDistance()
// geoPoints is the faa geojson collection containing multiple Point features, geojson is the user geojson feature
function findNearby(geoPoints, geojson, maxMiles, cb) {
  console.log("findNearby()");
  let nearby = [];
  // loop through geojson
  turf.featureEach(geojson, function (poly, index) {
    // convert polygon to line
    var line = turf.polygonToLine(poly);
    // find distance between line from geo1 and geo2
    turf.featureEach(geoPoints, function (pt, idx) {
      var distance = turf.pointToLineDistance(pt, line, {
        units: 'miles'
      });
      // store/push ones whose distance is less than 5 miles from airport
      if (distance < maxMiles) {
        nearby.push({
          distance: distance,
          feature: pt
        });
      }
    })
  });

  // Call back function
  if (cb && typeof cb == "function") {
    cb(nearby);
  } else {
    // No callback exists
    return nearby;
  }
}

// Takes in two geojson feature(s). Converts geojson polygons to lines in order to use turf.pointToLienDistance()
// geoPoints is the faa geojson collection containing multiple Point features, geojson is the user geojson feature
function findNearbyP(geoPoints, geojson, maxMiles) {
  console.log("findNearby()");
  return new Promise((resolve, reject) => {
    let nearby = [];
    // loop through geojson
    try {
      console.log("Convert userPoly into lines");
      console.log(geojson);
      const line = tPolygonToLine(geojson.feature);
        // convert polygon to line
        // var line = turf.polygonToLine(geojson);
        console.log(line);
        // find distance between line from geo1 and geo2
        turf.featureEach(geoPoints, function (pt, idx) {
          if(index < 5){
            console.log(pt)
          }
            // console.log(idx);
          var distance = turf.pointToLineDistance(pt, line, {
            units: 'miles'
          });
        // store/push ones whose distance is less than 5 miles from airport
        if (distance < maxMiles) {
          nearby.push({
            distance: distance,
            airport: pt
          });
        }
      });
    resolve(nearby);
    }
    catch(err) {
      reject(err)
    }
  });
}

function tPolygonToLine(poly) {
  return new Promise((resolve, reject)=> {
    try {
      resolve(turf.polygonToLine(poly));
    }
    catch(err) {
      reject(err)
    }
  })
}