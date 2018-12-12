'use strict';
const mongoose = require("mongoose");

//user schema
const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

// schema for item give structurte to data 
const itemSchema = mongoose.Schema({
    image: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: String, required: true},
    description: {type: String, required: true},
    shortDescription: {type: String, required: true},
    seller: {type: mongoose.Schema.ObjectId, ref: 'User' },
    publishedOn: Date
});

//pending serialization 
// itemSchema.methods.serialize = function() {
//     return {
//         id: this._id,
//         name: this.name,
//         price:this.price,
//         description: this.description,
//         'short-description': this['short-description'],
//         seller: {},
//         publishedAt: this.publishedAt
//     }
// };

const User = mongoose.model('User', userSchema);
//creating model from schema to be used for rest api routes 
const Item = mongoose.model('Item', itemSchema);
// export model object to use in other file 
module.exports = { Item, User };