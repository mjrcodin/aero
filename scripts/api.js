const axios = require('axios');
module.exports = {
  getStadiums: function() {
    return axios.get('http://ais-faa.opendata.arcgis.com/datasets/67af16061c014365ae9218c489a321be_0.geojson');
  },
  getAirports: function() {
    return axios.get('http://ais-faa.opendata.arcgis.com/datasets/e747ab91a11045e8b3f8a3efd093d3b5_0.geojson');
  },
  getClassAirspace: function() {
    return axios.get('http://ais-faa.opendata.arcgis.com/datasets/c6a62360338e408cb1512366ad61559e_0.geojson');
  },
  getSpecialUseAirspace: function() {
    return axios.get('http://ais-faa.opendata.arcgis.com/datasets/dd0d1b726e504137ab3c41b21835d05b_0.geojson');
  },
  getNSUFRs: function() {
    return axios.get('http://uas-faa.opendata.arcgis.com/datasets/0270b9d8a5d34217856cc03aaf833309_0.geojson')
  },
  getUASFacilityMaps: function() {
    return axios.get('http://uas-faa.opendata.arcgis.com/datasets/6269fe78dc9848d28c6a17065dd56aaf_0.geojson');
  },
  getUASFacilityMapsV2: function() {
    return axios.get('http://uas-faa.opendata.arcgis.com/datasets/9fed384137ba47189c37c3249694041e_0.geojson');
  }
}

// axios.all([getUserAccount(), getUserPermissions()])
// .then(axios.spread(function (acct, perms) {
//   // Both requests are now complete
// }));
