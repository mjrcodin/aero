require('dotenv').load()
const mbxUploads = require('@mapbox/mapbox-sdk/services/uploads');
const uploadsClient = mbxUploads({ accessToken: process.env.MAPBOX_API_KEY});


uploadsClient
  .listUploads()
  .send()
  .then(response => {
      const uploads = response.body;
      console.log(uploads)
  });