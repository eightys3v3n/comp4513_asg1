const { Router } = require('express');
const { isAuthenticated } = require('../helpers/generic.js');
const { User } = require('../helpers/mongoDataConnector.js');


// Handles requests made to /api/user
const logoutRouter = Router();


// This translates to 'api/logout' because of the express router
logoutRouter.get('/', (req, res) => {
  if (isAuthenticated()) {
    console.log("User logging out");
    req.logout();
  } else {
    console.log("User is not logged in");
    res.json("Must be authenticated to use this API. Post email and password to /api/login");
  }
});


module.exports = { logoutRouter };
