'use strict';
const express = require('express');
const router = express.Router();
const {Item} = require('./item-model');

//GET all items for sale
router.get('/', (req, res) => {
    Item
      .find()
      .then(items => {
        res.json({
          items: items.map(
            (item) => item)
        });
      })
      .catch( err => {
        console.error(err);
        res.status(500).json({message: 'Something went wrong while getting all items from server or db'})}
        );
  });

//GET items for sale by ID
router.get('/:id', (req, res) => {
    Item
      .findById(req.params.id)
      .then((item) => res.json(item))
      .catch( err => {
        console.error(err);
        res.status(500).json({message: 'Something went wrong while getting item from server or db'});
      });
  });

//POST creating new item for sale
router.post('/', (req, res) => {
    // check to see if req.body contains required fields before POST
    const requiredFields = ['price', 'name', 'description', 'image', 'shortDescription'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
      }
    }
  
    Item
      .create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        shortDescription: req.body.shortDescription,
        publishedOn: new Date()
      })
      .then(
        item => res.status(201).json(item))
      .catch( err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error from POST route'});
      })
  });

//PUT update item's data
router.put('/:id', (req, res) => {
    Item
    .findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
      Item
      .findOne({_id: req.params.id})
      .then((updatedItem) => {
        res.status(204).json(updatedItem);
      })
      .catch( err => {
        console.error(err);
        res.status(500).json({message: "Error while retriving updated item"});
      });
    })
    .catch( err => {
      console.error(err);
      res.status(500).json({message: "There was an error while retriving the item to be updated"});
    });
  });

//DELETE items by ID  
router.delete('/:id', (req, res) => {
  console.log("deleting post now...");
  Item
  .findByIdAndRemove(req.params.id)
  .then(() => res.status(204).end())
  .catch( err => res.status(500).json({message: "there was an error while deleting the post"}));
});

module.exports = router;