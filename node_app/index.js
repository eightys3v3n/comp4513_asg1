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

// ***************************************************
// New content from page 12
// Configuring the routes
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
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
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true
    })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Use express flash, which will be used for passing messages
app.use(flash());
// set up the passport authentication
require('./src/auth.js');
// In this example, we are using a session-based approach to maintaining
// our authentication status.
// Like the sessions in PHP, the Passport package uses cookies
// behind-the-scenes to implement server sessions.
// ***************************************************


// CORS for API accessing from URLs other than the API url.
// Otherwise the fetch doesn't work for clients.
app.use(cors());
let whitelist = ['http://localhost:3000',
                 'http://localhost:8082',
                 'http://server.eighty7.ca:80',
                 'http://server.eighty7.ca:8082'];
let corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin !== -1)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};


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


//, helper.ensureAuthenticated   , { user: req.user } 
app.get('/', helper.ensureAuthenticated, (req, res) => {
  res.json("Hello world");
  //res.json('../react_app/src/index.js');
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
  req.logout();
  req.flash('info', 'You were logged out');
  res.render('login', {message: req.flash('info')} );
});


app.get('/list', (req, res) => {
  //console.log(req.isAuthenticated());
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
});

app.get('/play/:id', (req, res) => {
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
});


app.get('/user/:id', (req, res) => {
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
});


// customize the 404 error with our own middleware function
app.use(function (req, res, next) {
  res.status(404).send("Error, webpage cannot be found.")
});

app.listen(NODEJS_PORT, function () {
  console.log("Server running at port= " + NODEJS_PORT);
});
