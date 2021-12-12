const passport = require('passport');
const { Router } = require('express');
const { parse_down_user } = require('../src/helpers.js');

const loginRoute = Router();


loginRoute.post('/', async (req, res, next) => {
  console.log(`Trying to login with ${req.body.email}:${req.body.password}`);

  passport.authenticate('localLogin', (err, user, info) => {
    if (!user) {
      res.json(false);
    } else {
      let user_info = parse_down_user(user);
      res.json(user_info);
    }
  })(req, res, next);
});


module.exports = { logoutRouter };
