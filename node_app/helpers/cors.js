const cors = require('cors'); // cross-site origin stuff for the API

// Cross-Origin Requesting for API accessing from URLs other than the API url.

// Allow cross-origin requests from these sites
let whitelist = ['http://localhost:3000',
                 'http://localhost:8082',
                 'http://server.eighty7.ca',
                 'http://server.eighty7.ca:8082',
                 'http://server.eighty7.ca:3000'];


// Add the Allow-Cross-Origin headers
let corsOptions = {
  credentials: true, // allow the use of credentials (cookies) in cross-origin requests
  origin: function(origin, callback) { // only allow cross-origin if its from one of the listed URLs
    if (whitelist.indexOf(origin !== -1)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};


function setup(app) {
  app.use(cors(corsOptions));
}


module.exports = {setup}
