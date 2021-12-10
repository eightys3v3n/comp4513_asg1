const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('./User.js').userSchema;
const playSchema = require('./Play.js').playSchema;
require('dotenv').config();


const NODEJS_PORT = process.env.NODEJS_PORT;
const MONGODB_CONSTRING = process.env.MONGODB_CONSTRING;
const server = express();


server.get('/', (req, res) => {
  res.json("Hello world");
});


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


async function main() {
  console.log(`Connecting to MongoDB at ${MONGODB_CONSTRING}...`);
  await mongoose.connect(MONGODB_CONSTRING);

  //print_user();
  print_play();
  
  server.listen(NODEJS_PORT, () => {
    console.log(`Listening on ${NODEJS_PORT}`);
  });
}


main();
