'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
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

//GET user info by user ID
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
// router.post('/', (req, res) => {
//     const requiredFields = ['firstName', 'lastName', 'username', 'email', 'password'];
//     for (let i=0; i<requiredFields.length; i++) {
//       const field = requiredFields[i];
//       if (!(field in req.body)) {
//         const message = `Missing \`${field}\` in request body`
//         console.error(message);
//         return res.status(400).send(message);
//       }
//     }
//     User
//     .create({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       username: req.body.username,
//       password: req.body.password,
//       email: req.body.email
//     })
//     .then(user => res.status(201).json(user))
//     .catch(err => res.status(500).json({message: 'internal server error'}));
//   });
  
  //POST new user
  router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['username', 'password', 'email', 'firstName', 'lastName'];
    const missingField = requiredFields.find(field => !(field in req.body));
  
    if (missingField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Missing field',
        location: missingField
      });
    }
  
    const stringFields = ['username', 'password', 'firstName', 'lastName', 'email'];
    const nonStringField = stringFields.find(
      field => field in req.body && typeof req.body[field] !== 'string'
    );
  
    if (nonStringField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Incorrect field type: expected string',
        location: nonStringField
      });
    }
  
    // If the username and password aren't trimmed we give an error.  Users might
    // expect that these will work without trimming (i.e. they want the password
    // "foobar ", including the space at the end).  We need to reject such values
    // explicitly so the users know what's happening, rather than silently
    // trimming them and expecting the user to understand.
    // We'll silently trim the other fields, because they aren't credentials used
    // to log in, so it's less of a problem.
    const explicityTrimmedFields = ['username', 'password', 'email'];
    const nonTrimmedField = explicityTrimmedFields.find(
      field => req.body[field].trim() !== req.body[field]
    );
  
    if (nonTrimmedField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Cannot start or end with whitespace',
        location: nonTrimmedField
      });
    }
  
    const sizedFields = {
      username: {
        min: 1
      },
      password: {
        min: 10,
        // bcrypt truncates after 72 characters, so let's not give the illusion
        // of security by storing extra (unused) info
        max: 72
      }
    };
    const tooSmallField = Object.keys(sizedFields).find(
      field =>
        'min' in sizedFields[field] &&
              req.body[field].trim().length < sizedFields[field].min
    );
    const tooLargeField = Object.keys(sizedFields).find(
      field =>
        'max' in sizedFields[field] &&
              req.body[field].trim().length > sizedFields[field].max
    );
  
    if (tooSmallField || tooLargeField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: tooSmallField
          ? `Must be at least ${sizedFields[tooSmallField]
            .min} characters long`
          : `Must be at most ${sizedFields[tooLargeField]
            .max} characters long`,
        location: tooSmallField || tooLargeField
      });
    }
  
    let {username, password, email, firstName = '', lastName = ''} = req.body;
    // Username and password come in pre-trimmed, otherwise we throw an error
    // before this
    firstName = firstName.trim();
    lastName = lastName.trim();
  
    return User.find({username})
      .count()
      .then(count => {
        if (count > 0) {
          // There is an existing user with the same username
          return Promise.reject({
            code: 422,
            reason: 'ValidationError',
            message: 'Username already taken',
            location: 'username'
          });
        }
        // If there is no existing user, hash the password
        return User.hashPassword(password);
      })
      .then(hash => {
        return User.create({
          username,
          password: hash,
          email,
          firstName,
          lastName
        });
      })
      .then(user => {
        return res.status(201).json(user.serialize());
      })
      .catch(err => {
        // Forward validation errors on to the client, otherwise give a 500
        // error because something unexpected has happened
        if (err.reason === 'ValidationError') {
          return res.status(err.code).json(err);
        }
        res.status(500).json({code: 500, message: 'Internal server error'});
      });
  });

  //POST login new user
  router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // User.hashPassword(req.body.password)
    // .then()
  User
  .find({username: username})
  .then(user => {
    // console.log(user.password);
    // User.decypt
    user.validate(password);
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