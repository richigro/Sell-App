'use strict';

//destructing and renaming variables
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { User } = require('../users/user-model');
const { JWT_SECRET } = require('../config');


const localStrategy = new LocalStrategy((username, password, callback) => {
    let user;
    User.findOne({ username: username })
      .then(_user => {
        user = _user;
        console.log(user);
        if (!user) {
          //check credentials
          return Promise.reject({
            reason: 'LoginError',
            message: 'Incorrect username or password'
          });
        }
        return user.validatePassword(password);
      })
      .then(isValid => {
        if (!isValid) {
          return Promise.reject({
            reason: 'LoginError',
            message: 'Incorrect username or password'
          });
        }
        return callback(null, user);
      })
      .catch(err => {
        if (err.reason === 'LoginError') {
          return callback(null, false, err);
        }
        return callback(err, false);
      });
  });

  module.exports = localStrategy;