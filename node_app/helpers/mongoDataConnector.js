const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = require('../models/User.js').userSchema;
const playSchema = require('../models/Play.js').playSchema;

const User = mongoose.model('User', userSchema);
const Play = mongoose.model('Play', playSchema);

const connect = () => {
   const opt = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        dbName: "asg2"
   };

   console.log(`Connecting to MongoDB at ${process.env.MONGODB_CONSTRING}`);

   mongoose.connect(process.env.MONGODB_CONSTRING, opt);

   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'Connection error:'));

   db.once('open', function callback () {
      console.log(`Connected to MongoDB at ${process.env.MONGODB_CONSTRING}`);
   });
};

module.exports = {connect, User, Play};
