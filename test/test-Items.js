const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//generates fake data for testing
const faker = require('faker');

const { TEST_DATABASE_URL } = require('../config');
const { ITEMS_URL } = require('../config');
const { app, runServer, closeServer} = require('../server');
const {Item} = require('../models');
const expect = chai.expect;

chai.use(chaiHttp);

function seedItemData() {
    console.info('Seeding item data');
    const seedData = [];

    for (let i =0; i <= 10; i++) {
        seedData.push(generateItemData());
    }
    return Item.insertMany(seedData);
}

function generateItemData() {
    return {
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
        description: faker.lorem.paragraph(),
        shortDescription: faker.lorem.sentence(),
        publishedOn: new Date()
    };
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

// Testing CRUD operations for items endpoints 
describe('CRUD enpoints for items', function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function(){
        return seedItemData();
    });
    afterEach(function() {
        return tearDownDb();
    });
    // close server after testing
    after(function() {
        return closeServer();
    });
    //GET enpoint
    describe('GET enpoint', function() {
        
        it("Should return all items currently for sale on database", function() {
            let res;
            return chai.request(app)
            .get(ITEMS_URL)
            .then(function(_res) {
                res = _res;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.items).to.be.a('array');
                expect(res.body.items.length).to.be.above(0);
                return Item.count();
            })
            .then(function(count) {
                expect(res.body.items).to.have.lengthOf(count);
            });
        });
    
        it("should return items with the correct fields", function() {
            let resItem;
            return chai.request(app)
            .get(ITEMS_URL)
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.items).to.be.a('array');
                expect(res.body.items).to.have.lengthOf.at.least(1);
                res.body.items.forEach(function(item) {
                    expect(item).to.be.a('object');
                    expect(item).to.have.all.keys('_id','name', 'description', 'shortDescription', 'image', 'price', 'publishedOn', '__v');
                });
                resItem = res.body.items[0];
                return Item.findById(resItem['_id']);
            })
            .then(function(item) {
                expect(resItem['_id']).to.equal(item.id);
                expect(resItem.name).to.equal(item.name);
                expect(resItem.price).to.equal(item.price);
                expect(resItem.image).to.equal(item.image);
                expect(resItem.description).to.equal(item.description);
                expect(resItem.shortDescription).to.equal(item.shortDescription);
            });
        });

    });
    
    // POST endpoint
    //make a post request with data from created function
    // and proved that we can get it back from database 
    // with the right keys
    describe('POST enpoint', function() {
        it('should add a new item', function() {
            const newItem = generateItemData();
        
            return chai.request(app)
            .post(ITEMS_URL)
            .send(newItem)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('_id', 'name', 'price', 'image', 'description', 'shortDescription', 'publishedOn');
                expect(res.body.name).to.equal(newItem.name);
                expect(res.body.price).to.equal(Math.round(newItem.price));
                expect(res.body.image).to.equal(newItem.image);
                expect(res.body.description).to.equal(newItem.description);
                expect(res.body.shortDescription).to.equal(newItem.shortDescription);
                return Item.findById(res.body['_id']);
            })
            .then(function(item) {
                expect(item.name).to.equal(newItem.name);
                expect(item.price).to.equal(Math.round(newItem.price));
                expect(item.image).to.equal(newItem.image);
                expect(item.description).to.equal(newItem.description);
                expect(item.shortDescription).to.equal(newItem.shortDescription);
            });
        });
    });
    //PUT endpoint
    describe('PUT endpoint', function() {
        it('Should update only the fields you send over', function() {
            const updateData = {
                name: 'Test Name',
                price: 120
            }
            return Item
                .findOne()
                .then(function(item) {
                    updateData.id = item['_id'];
                    return chai.request(app)
                        .put(`/items/${updateData.id}`)
                        .send(updateData);
                })
                .then(function(res) {
                    expect(res).to.have.status(204);
                    return Item.findById(updateData.id);
                })
                .then(function(item) {
                    expect(item.name).to.equal(updateData.name);
                    expect(item.price).to.equal(updateData.price);
                });
        });
    });
    //DELETE enpoint 
    describe('DELETE enpoint', function() {
        
        it('Should delete an item by id', function() {
            let item;
            return Item 
                .findOne()
                .then(function(_item) {
                    item = _item;
                    return chai.request(app).delete(`/items/${item.id}`);
                })
                .then(function(res) {
                    expect(res).to.have.status(204);
                    return Item.findById(item.id);
                })
                .then(function(_item) {
                    expect(_item).to.be.null;
                });
        });
    });
});


