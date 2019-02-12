'use strict';
//requiring .env file
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require("morgan");
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//destructing and renaming variables
// const { router: usersRouter } = require('./users/usersRouter');
const { localStrategy, jwtStrategy } = require('./auth/strategies');
const {router: authRouter} = require('./auth/authRouter');

// const {JWT_SECRET} = process.env;
const {PORT, DATABASE_URL} = require('./config');
//routes 
const itemsRouter = require('./items/itemsRouter');
const usersRouter = require('./users/usersRouter');
//middleware
app.use(morgan('common'));
//CORS
app.use(function (req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// CRUD routes for items
app.use('/items', itemsRouter);
//CRUD routes for users
// app.use('/users', usersRouter);
app.use('/api/users/', usersRouter);

app.use('/auth', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
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
