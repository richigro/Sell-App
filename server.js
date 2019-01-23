'use strict';
const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {Item} = require('./models');
const {User} = require('./models');

app.use(morgan('common'));
app.use(express.static('public'));

//fix post bug
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//get all items for sale
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
      console.error(err);
      res.status(500).json({message: 'Something went wrong while getting all items from server or db'})}
      );
});

//get item for sale by id
app.get('/for-sale/:id', (req, res) => {
  Item
    .findById(req.params.id)
    .then((item) => res.json(item))
    .catch( err => {
      console.error(err);
      res.status(500).json({message: 'Something went wrong while getting item from server or db'});
    });
});
//get all items that belong to specific user

// post for creating new items for sale
app.post('/post-for-sale', (req, res) => {
  //get seller id from jwt
  // const sellerId = 
  
  console.log(req.body);
  const requiredFields = ['price', 'name', 'description', 'image', 'shortDescription'];
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
      image: req.body.image,
      shortDescription: req.body.shortDescription,
      seller: sellerId,
      publishedOn: new Date()
    })
    .then(
      item => res.status(201).json(item))
    .catch( err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error from POST route'});
    })
});

// update user posted item
app.put('/edit/post/:id', (req, res) => {
  Item
  .findByIdAndUpdate({_id: req.params.id}, req.body)
  .then(() => {
    Item
    .findOne({_id: req.params.id})
    .then((updatedItem) => {
      res.status(204).json(updatedItem);
    })
    .catch( err => {
      console.error(err);
      res.status(500).json({message: "Error while retriving updated item"});
    });
  })
  .catch( err => {
    console.error(err);
    res.status(500).json({message: "There was an error while retriving the item to be updated"});
  });
});


app.delete('/delete/post/:id', (req, res) => {
  const itemId = req.params.id
  console.log("deleting post now...");
  Item
  .findByIdAndRemove(itemId)
  .then(
    res.status(204))
  .catch( err => {
    console.error(err);
    res.status(500).json({message: "there was an error while deleting the post"});
  });

});

// crud for users
app.post('sign-up/new-user/', (req, res) => {
  User
  .create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    password: req.body.password
  })
  .then(user => res.status(201).json(user))
  .catch(err => res.status(500).json({message: 'hi'}));
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