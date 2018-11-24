'use strict';
const express = require('express');
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {Item} = require('./models');


app.use(morgan('common'));
// app.use(express.static('public'));

app.get('/for-sale', (req, res) => {
  Item
    .find()
    .then(items => {
      res.json({
        items: items.map(
          (item) => item )
      });
    })
    .catch( err => {
      console.error(err)
      res.status(500).json({message: 'Something went wrong'})}
      );
});

app.post('/post-for-sale', (req, res) => {
  res.send("post");
});

// app.put('/');


app.delete('/my-account/:item-id', (req, res) => {
  res.send("hello from delete");
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
    runServer(DATABASE_URL).catch(err => console.error(err));
  };
  
 module.exports = { app, runServer, closeServer };