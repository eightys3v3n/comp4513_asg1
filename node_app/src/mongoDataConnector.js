// Change the database Location, or just edit the existing MongoDB collection/db
// Page 8
const mongoose = require('mongoose');

const connect = () => {
   const opt = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        dbName: "asg2"
   };
   // dbName is actually clusterName, not collectionName --> collectionName in schema (User.js, Play.js)
   mongoose.connect(process.env.MONGODB_CONSTRING, opt);
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', function callback () {
      console.log("connected to mongo");
   });
};

module.exports = {
   connect
};
