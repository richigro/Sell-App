'use strict';
const express = require('express');
const router = express.Router();
const {User} = require('./user-model');

//GET all users not for production only development
router.get('/', (req, res) => {
  User
    .find()
    .then(users => {
      res.json({
        users: users.map(
          (user) => user.serialize())
      });
    })
    .catch( err => {
      console.error(err);
      res.status(500).json({message: 'Something went wrong while getting all users'})}
      );
});

//GET user info by ID
router.get('/:id', (req, res) => {
  User
    .findById(req.params.id)
    .then((user) => res.json(user.serialize()))
    .catch( err => {
      console.error(err);
      res.status(500).json({message: 'Could not get user'});
    });
});

//POST create new user
router.post('/', (req, res) => {
    const requiredFields = ['firstName', 'lastName', 'username', 'email', 'password'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
    User
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({message: 'internal server error'}));
  });
  
  //POST login new user
  router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  User
  .find({username: username})
  .then(user => {
    console.log(user.password);
    if(user.password === password){
      return res.status(200).json({message: "Successful Login"}); 
    };
    return Promise.reject({
      code: 422,
      reason: 'ValidationError',
      message: 'Invalid password',
      location: 'password'
    });
  })
  .catch(err => res.status(500).json({message: "something went wrong server"}));
  });

//PUT update user's information
router.put('/:id', (req, res) => {
  User
  .findByIdAndUpdate({_id: req.params.id}, req.body)
  .then(() => {
    User
    .findOne({_id: req.params.id})
    .then((updatedUser) => {
      res.status(204).json(updatedUser);
    })
    .catch( err => {
      console.error(err);
      res.status(500).json({message: "Error while retriving updated User"});
    });
  })
  .catch( err => {
    console.error(err);
    res.status(500).json({message: "There was an error while retriving the user to be updated"});
  });
});

  //DELETE users by ID
  router.delete('/:id', (req, res) => {
    console.log("deleting user now...");
    User
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch( err => res.status(500).json({message: "there was an error while deleting the post"}));
  });


  module.exports = router;