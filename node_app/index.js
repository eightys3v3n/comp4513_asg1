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


app.use(express.json());
app.use(express.urlencoded({extended: true}));
// New content from page 12
app.use(cookieParser('oreos'));
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./src/auth.js');





// ***************************************************
/* --- middleware section --- */ 
//view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');
// serves up static files from the public folder. 
app.use('/static', express.static(path.join(__dirname,'public')));
// tell node to use json and HTTP header features


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
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});




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



function isAuthed() {
	return true;
	//return req.isAuthenticated();
}



app.get('/', (req, res) => {
  res.json(req.isAuthenticated());
});


app.post('/login', async (req, res, next) => {
  console.log("Login attempt");
  
  passport.authenticate('localLogin', (err, user, info) => {
    // Use passport authentication to see if valid login
    passport.authenticate('localLogin', { 
      successRedirect: 'http://localhost:3000/',
      failureRedirect: '/login',
      failureFlash: true }) (req, res, next);
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


app.get('/list', (req, res) => {
  if (isAuthed()) {
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
  if (isAuthed()) {
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
  if (isAuthed()) {
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
