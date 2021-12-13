const passport = require('passport');
const { Router } = require('express');
const { parse_down_user } = require('../helpers/generic.js');

const loginRouter = Router();


// This translates to 'api/login' because of the express router
loginRouter.post('/', async (req, res, next) => {
  console.log(`Trying to login with ${req.body.email}:${req.body.password}`);

  passport.authenticate('localLogin', (err, user, info) => {
    passport.authenticate('localLogin', {
      successRedirect: '/api/user/'+user.id,
      failureRedirect: '/api/login',
      failureFlash: false }) (req, res, next);
  })(req, res, next);
});


module.exports = { loginRouter };
