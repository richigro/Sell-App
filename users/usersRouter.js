'use strict';
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {User} = require('./user-model');

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

  module.exports = router;