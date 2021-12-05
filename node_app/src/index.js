const express = require('express');
require('dotenv').config();


let port = process.env.PORT;
const server = express();


server.get('/', (req, res) => {
  res.json("Hello world");
});


server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
