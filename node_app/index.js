// Run on node_app: >>> node index.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

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






/* ------------------------------------------------ ROUTES START HERE ------------------------------------------------ */

//, helper.ensureAuthenticated   , { user: req.user } 
app.get('/', helper.ensureAuthenticated, (req, res) => {
  //res.json("Hello world");
  res.json("Eurika, it worked!");
});


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


// ***************************************************
// Page 13
// NOTE: THIS IS THE LOGIN PAGE SETUP

// Note: This login deals with redirecting
app.get('/login', (req,res) => {
  res.render('login.ejs', {message: req.flash('error')} );
});
app.post('/login', async (req, resp, next) => {
  // Use passport authentication to see if valid login
  passport.authenticate('localLogin', { 
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true }) (req, resp, next);
});

// NOTE: THIS IS THE LOGOUT PAGE SETUP
app.get('/logout', (req,resp) => {
  req.logout();
  req.flash('info', 'You were logged out');
  resp.render('login', {message: req.flash('info')} );
});
// Then modify handlers for the api routes in api-router.js
// ***************************************************


// async function main() {
//   console.log(`Connecting to MongoDB at ${MONGODB_CONSTRING}...`);
//   await mongoose.connect(MONGODB_CONSTRING);

//   //print_user();
//   print_play();
  
//   app.listen(NODEJS_PORT, () => {
//     console.log(`Listening on ${NODEJS_PORT}`);
//   });
// }
// main();


// customize the 404 error with our own middleware function
app.use(function (req, res, next) {
  res.status(404).send("Error, webpage cannot be found.")
});

app.listen(NODEJS_PORT, function () {
  console.log("Server running at port= " + NODEJS_PORT);
});