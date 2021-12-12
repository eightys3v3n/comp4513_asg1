// Run on node_app: >>> node index.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userSchema = require('./src/User.js').userSchema;
const playSchema = require('./src/Play.js').playSchema;
const User = mongoose.model('User', userSchema);
const Play = mongoose.model('Play', playSchema);

const NODEJS_PORT = process.env.NODEJS_PORT;
const MONGODB_CONSTRING = process.env.MONGODB_CONSTRING;

console.log(`Connecting to MongoDB with ${MONGODB_CONSTRING}`);

// ***************************************************
// New content from page 12
// Configuring the routes
const session = require('express-session');
const cookieParser = require('cookie-parser');
//const flash = require('express-flash');
const passport = require('passport');
const helper = require('./src/helpers.js');
// controls book data access
//const controller = require('./src/bookDataController.js'); // may or may not need
// use the api route handlers (moved into here)
//const apiRouter = require('./src/api-router.js'); // may or may not need
require('./src/mongoDataConnector.js').connect();
// ***************************************************

const app = express();

// ***************************************************
/* --- middleware section --- */ 
//view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');
// serves up static files from the public folder. 
app.use('/static', express.static(path.join(__dirname,'public')));
// tell node to use json and HTTP header features
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// New content from page 12
app.use(cookieParser('oreos'));
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Use express flash, which will be used for passing messages
//app.use(flash());
// set up the passport authentication
require('./src/auth.js');
// In this example, we are using a session-based approach to maintaining
// our authentication status.
// Like the sessions in PHP, the Passport package uses cookies
// behind-the-scenes to implement server sessions.
// ***************************************************


// CORS for API accessing from URLs other than the API url.
// Otherwise the fetch doesn't work for clients.
let whitelist = ['http://localhost:3000',
                 'http://localhost:8082',
                 'http://server.eighty7.ca',
                 'http://server.eighty7.ca:8082',
                 'http://server.eighty7.ca:3000'];
let corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin !== -1)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));


function parse_down_user(data) {
  let ret_data = {
    id: data.id,
    details: data.details,
    picture: data.picture,
    membership: data.membership,
    email: data.email
  };
  return ret_data;
}


/* -------------------------------- ROUTES START HERE ------------------------------------------------ */


app.get('/', helper.ensureAuthenticated, (req, res) => {
  res.json(res.isAuthenticated());
});


app.post('/login', async (req, res, next) => {
  console.log("Login attempt");
  
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
  if (req.isAuthenticated()) {
    console.log("User logging out");
    req.logout();
  } else {
    console.log("User is not logged in");
    res.json("Must be authenticated to use this API. Post email and password to /login");
  }
});


app.get('/list', (req, res) => {
  console.log("Sessions");
  console.log(req.sessionStore.sessions);
  console.log();

  console.log("Cookies in this request");
  console.log(req.cookies, req.signedCookies);

  if (req.isAuthenticated()) {
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

app.get('/play/:id', (req, res) => {
  if (req.isAuthenticated()) {
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


app.get('/user/:id', (req, res) => {
  if (req.isAuthenticated()) {
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


// customize the 404 error with our own middleware function
app.use(function (req, res, next) {
  res.status(404).send("Error, webpage cannot be found.")
});

app.listen(NODEJS_PORT, function () {
  console.log("Server running at port= " + NODEJS_PORT);
});
