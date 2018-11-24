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
          (item) => item)
      });
    })
    .catch( err => {
      console.error(err)
      res.status(500).json({message: 'Something went wrong'})}
      );
});

app.post('/post-for-sale', (req, res) => {
  const requiredFields = ['name', 'price', 'description', 'short-description', 'contact', 'publishedAt'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Item
    .create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      'short-description': req.body['short-description'],
      contact: {
        seller: 'created from post request',
        phone: '1231313131313',
        email: 'post@request.com',
        location: '/post-for-sale route POST'
      },
      publishedAt: Date()
    })
    .then(
      item => res.status(201).json(item))
    .catch( err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error from POST route'});
    })  
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
          // so we don't also call `resolve()`
          return reject(err);
        }
        resolve();
      });
    });
  }
  
  if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
  };
  
 module.exports = { app, runServer, closeServer };