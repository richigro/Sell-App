'use strict';
const mongoose = require("mongoose");


// schema for item give structurte to data 
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

//pending serialization 
// itemSchema.methods.serialize = function() {
//     return {
//         id: this._id,
//         name: this.name,
//         price:this.price,
//         description: this.description,
//         'short-description': this['short-description'],
//         this: this,
//         publishedAt: this.publishedAt
//     }
// };


//creating model from schema to be used for rest api routes 
const Item = mongoose.model('Item', itemSchema);
// export model object to use in other file 
module.exports = { Item };