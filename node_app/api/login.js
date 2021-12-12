const passport = require('passport');
const { parse_down_user } = require('../src/helpers.js');


app.post('/login', async (req, res, next) => {
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


app.get('/logout', (req, res) => {
  if (isAuthed()) {
    console.log("User logging out");
    req.logout();
  } else {
    console.log("User is not logged in");
    res.json("Must be authenticated to use this API. Post email and password to /login");
  }
});
