// Run on node_app: >>> node index.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userSchema = require('./src/User.js').userSchema;
const playSchema = require('./src/Play.js').playSchema;

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


// CORS for API accessing
app.use(cors());
let whitelist = ['http://localhost:3000',
                 'http://localhost:8082'];
let corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin !== -1)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};



/* ------------------------------------------------ ROUTES START HERE ------------------------------------------------ */


// Need 2 api calls




async function print_user() {
  const User = mongoose.model('User', userSchema);
  let test = await User.findOne();
  console.log(test);
}

async function print_play() {
  const Play = mongoose.model('Play', playSchema);
  let test = await Play.findOne({playText: {$exists: true, $ne: {}}});
  console.log(test);
}


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
      res.json(user);
    }
  })(req, res, next);
});


app.get('/logout', (req, res) => {
  req.logout();
  req.flash('info', 'You were logged out');
  res.render('login', {message: req.flash('info')} );
});


// customize the 404 error with our own middleware function
app.use(function (req, res, next) {
  res.status(404).send("Error, webpage cannot be found.")
});

app.listen(NODEJS_PORT, function () {
  console.log("Server running at port= " + NODEJS_PORT);
});
