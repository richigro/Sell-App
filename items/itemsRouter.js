'use strict';
const express = require('express');
const router = express.Router();
const {Item} = require('./item-model');
// const {User} = require('../users/user-model');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });

//GET all items for sale
router.get('/', (req, res) => {
    Item
      .find()
      .populate('seller')
      .exec()
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

//GET all items from a specific user
router.get('/getLoggedUserItems', jwtAuth, (req, res) => {
  const requestedUserId = req.user['_id'];
  console.log(requestedUserId, req.user);
  Item
  .find({"seller": requestedUserId})
  .then((itemList) => {
    res.status(200).json(itemList);
  })
  .catch(err => {
    console.error(err);
    res.send(500)}); 
});  

//GET items for sale by ID
router.get('/:id', (req, res) => {
    Item
      .findById(req.params.id)
      .populate('seller')
      .exec()
      .then((item) => res.json(item))
      .catch( err => {
        console.error(err);
        res.status(500).json({message: 'Unable to retrieve item'});
      });
  });

//POST creating new item for sale
router.post('/',  jwtAuth, (req, res) => {
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
        seller: req.user['_id'],
        publishedOn: new Date()
      })
      .then(
        (item) => res.status(201).json(item))
      .catch( err => {
        console.error(err);
        res.status(500).json({message: 'Unable to create new item'});
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
        res.status(500).json({message: "Unable to retrieve item to be updated"});
      });
    })
    .catch( err => {
      console.error(err);
      res.status(500).json({message: "Unable to update item"});
    });
  });

//DELETE items by ID  
router.delete('/:id', (req, res) => {
  console.log("deleting item now...");
  Item
  .findByIdAndRemove(req.params.id)
  .then(() => res.status(204).end())
  .catch( err => res.status(500).json({message: "Could not delete current item"}));
});

module.exports = router;