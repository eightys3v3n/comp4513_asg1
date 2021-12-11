// For testing purposes, delete when finished
require('dotenv').config();
const express = require('express');
const connector = require('./src/mongoDataConnector.js').connect();
const UserModel = require('./src/User.js');
// Find one user (example)
// cluster is in connector (mongoDataConnector.js) and collection is in UserModel schema (User.js)
UserModel.findOne({ email: "zpochet2@apple.com" }, (err, data) => {
    if (err) {
        console.log('user not found');
    } else {
        console.log('-- User found ---');
        console.log(data);
    }
});