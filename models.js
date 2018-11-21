'use strict';
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const itemSchema = mongoose.Schema({
    image: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: String, required: true},
    description: {type: String, required: true},
    'short-description': {type: String, required: true},
    contact: {
        seller: {type: String, required: true},
        phone: {type: String, required: true},
        email: {type: String, required: true},
        location: {type: String, required: true}
    },
    publishedAt: Number
});

module.exports = { Item };