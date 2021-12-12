const { Router } = require('express');
const { isAuthenticated } = require('../helpers/generic.js');
const { Play } = require('../helpers/mongoDataConnector.js');


// Handles requests made to /api/list
const listRouter = Router();


// This translates to 'api/list' because of the express router
listRouter.get('/', (req, res) => {
  if (isAuthenticated()) {
    Play.find({}, {playText: 0}, (err, data) => {
      if (err) {
        console.warn(`Failed to fetch play from DB: {err}`);
        res.json(err);
      }

      else if (data.length == 0) {
        console.log(`Found no plays`);
        res.json(data);
      } else {
        res.json(data);
      }
    });
  } else {
    console.log("User is not logged in");
    console.log(req.cookies, req.signedCookies);
    res.json("Must be authenticated to use this API. Post email and password to /login");
  }
});


module.exports = { listRouter };
