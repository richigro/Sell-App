'use strict';
const express = require('express');
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {Item} = require('./models');


app.use(morgan('common'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json(
    return Item.findOne().serialize();
  );
});

app.post('/', (req, res) => {
  res.send("post");
});

let server;

function runServer(databaseUrl, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}
  
  function closeServer() {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          reject(err);
          // so we don't also call `resolve()`
          return;
        }
        resolve();
      });
    });
  }
  
  if (require.main === module) {
    runServer().catch(err => console.error(err));
  };
  
 module.exports = { app, runServer, closeServer };