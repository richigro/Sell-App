'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");


// schema for item give structurte to data 
const itemSchema = mongoose.Schema({
    image: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    shortDescription: {type: String, required: true},
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    publishedOn: Date
});

//user schema
const userSchema = mongoose.Schema({
    firstName: {type: String, required: true, default: ''},
    lastName: {type: String, required: true, default: ''},
    userName: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    items: [itemSchema]
});
// user schema methods 
userSchema.methods.serialize = function() {
    return {
      username: this.username || '',
      firstName: this.firstName || '',
      lastName: this.lastName || ''
    };
  };
  userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };
  
  userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
  };

//pending serialization 
itemSchema.methods.serialize = function() {
    return {
        id: this._id,
        name: this.name,
        price:this.price,
        description: this.description,
        shortDescription: this.shortDescription,
        publishedAt: this.publishedAt
    }
};

const User = mongoose.model('User', userSchema);
//creating model from schema to be used for rest api routes 
const Item = mongoose.model('Item', itemSchema);
// export model object to use in other file 
module.exports = { Item, User };