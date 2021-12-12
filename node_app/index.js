require('dotenv').config(); // load environment variables

const express = require('express'); // server hosting framework
const mongoose = require('mongoose'); // database connectivity



const path = require('path');

// ***************************************************
// New content from page 12
// Configuring the routes

const cookieParser = require('cookie-parser');
//const flash = require('express-flash');
const passport = require('passport');
const helper = require('./helpers/generic.js');
// controls book data access
//const controller = require('./src/bookDataController.js'); // may or may not need
// use the api route handlers (moved into here)
//const apiRouter = require('./src/api-router.js'); // may or may not need
require('./helpers/mongoDataConnector.js').connect();
// ***************************************************



// Create the server application
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
// New content from page 12
app.use(cookieParser('oreos'));


// Allow cross-origin, IE requests from anywhere other than the API its self.
require('./helpers/cors.js').setup(app);

// Setup passport authentication and session stuff
require('./helpers/authenticate.js').setup(app);


// Enable all routes in /api
const { apiRouter } = require('./api/index.js');
app.use('/api', apiRouter);


// Connect to MongoDB
require('./helpers/mongoDataConnector.js').connect();


// Start listening for requests
const NODEJS_PORT = process.env.NODEJS_PORT;
app.listen(process.env.NODEJS_PORT, function () {
  console.log(`Server running on port ${process.env.NODEJS_PORT}`);
});
