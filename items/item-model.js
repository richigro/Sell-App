'use strict';
const mongoose = require("mongoose");

// Item Schema
const itemSchema = mongoose.Schema({
    image: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    shortDescription: {type: String, required: true},
    publishedOn: Date
});

//Item Method serialize
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

const Item = mongoose.model('Item', itemSchema);

module.exports = {Item};