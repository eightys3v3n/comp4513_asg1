const { Router } = require('express');
const { isAuthenticated } = require('../helpers/generic.js');
const { Play } = require('../helpers/mongoDataConnector.js');


// Handles requests made to /api/play
const playRouter = Router();


// This translates to 'api/play/:id' because of the express router
playRouter.get('/:id', (req, res) => {
  if (isAuthenticated()) {
    Play.find({id: req.params.id}, (err, data) => {
      if (err) {
        console.warn(`Failed to fetch play from DB: ${req.params.id}:${err}`);
        res.json(err);
      }
      else if (data.length == 0) {
        console.log(`Found no plays with ID: ${req.params.id}`);
        res.json(data);
      } else {
        res.json(data);
      }
    });
  } else {
    console.log("User is not logged in");
    res.json("Must be authenticated to use this API. Post email and password to /login");
  }
});


module.exports = { playRouter };
