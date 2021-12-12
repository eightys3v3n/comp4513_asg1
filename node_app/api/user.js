const { Router } = require('express');
const { isAuthenticated, parse_down_user, ensureAuthenticated } = require('../helpers/generic.js');
const { User } = require('../helpers/mongoDataConnector.js');


// Handles requests made to /api/user
const userRouter = Router();


// This translates to 'api/user/:id' because of the express router
userRouter.get('/:id', ensureAuthenticated, (req, res) => {
  if (isAuthenticated()) {
    User.findOne({id: req.params.id}, (err, data) => {
      if (err) {
        console.warn(`Failed to fetch user from DB: ${req.params.id}:${err}`);
        res.json(err);
      }
      else if (data.length == 0) {
        console.log(`Found no user with ID: ${req.params.id}`);
        res.json({});
      } else {
        let ret_data = parse_down_user(data);
        res.json(ret_data);
      }
    });
  } else {
    console.log("User is not logged in");
    res.json("Must be authenticated to use this API. Post email and password to /login");
  }
});


module.exports = { userRouter };
