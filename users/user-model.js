'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

//User schema
const userSchema = mongoose.Schema({
    firstName: {type: String, required: true, default: ''},
    lastName: {type: String, required: true, default: ''},
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

//User Schema methods serialize 
userSchema.methods.serialize = function() {
    return {
      username: this.username || '',
      firstName: this.firstName || '',
      lastName: this.lastName || ''
    };
  };

//User Schema methods validate password bcrypt-auth
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};
  
//User Schema methods hash password bcrypt-auth
userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

//User model
const User = mongoose.model('User', userSchema);

module.exports = {User};