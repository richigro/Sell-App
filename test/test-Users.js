//



'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//generates fake data for testing
const faker = require('faker');

const { TEST_DATABASE_URL } = require('../config');
const { USERS_URL } = require('../config');
const { app, runServer, closeServer} = require('../server');
const {User} = require('../users/user-model');
const expect = chai.expect;

chai.use(chaiHttp);

function seedUserData() {
    console.info('Seeding fake user data');
    const seedData = [];

    for (let i =0; i <= 6; i++) {
        seedData.push(generateUserData());
    }
    return User.insertMany(seedData);
}

function generateUserData() {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email()
    };
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

// Testing CRUD operations for user endpoints 
describe('CRUD enpoints for users', function() {
    
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function(){
        return seedUserData();
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
        
        it("Should return all fake users on database", function() {
            let res;
            return chai.request(app)
            .get(USERS_URL)
            .then(function(_res) {
                res = _res;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.users).to.be.a('array');
                expect(res.body.users.length).to.be.above(4);
                return User.count();
            })
            .then(function(count) {
                expect(res.body.users).to.have.lengthOf(count);
            });
        });
    
        it("should return users with the correct fields", function() {
            let resUser;
            return chai.request(app)
            .get(USERS_URL)
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.users).to.be.a('array');
                expect(res.body.users).to.have.lengthOf.at.least(1);
                res.body.users.forEach(function(user) {
                    expect(user).to.be.a('object');
                    expect(user).to.have.all.keys('_id','firstName', 'lastName', 'username', 'password', 'email', '__v');
                });
                resUser = res.body.users[0];
                return User.findById(resUser['_id']);
            })
            .then(function(user) {
                expect(resUser['_id']).to.equal(user.id);
                expect(resUser.firstName).to.equal(user.firstName);
                expect(resUser.lastName).to.equal(user.lastName);
                expect(resUser.username).to.equal(user.username);
                expect(resUser.password).to.equal(user.password);
                expect(resUser.email).to.equal(user.email);
            });
        });

    });
    
    // POST endpoint
    //make a post request with data from created function
    // and proved that we can get it back from database 
    // with the right keys
    describe('POST enpoint', function() {
        it('should add a new user', function() {
            const newUser = generateUserData();
        
            return chai.request(app)
            .post(USERS_URL)
            .send(newUser)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('_id', 'firstName', 'lastName', 'username', 'password', 'email');
                expect(res.body.firstName).to.equal(newUser.firstName);
                expect(res.body.lastName).to.equal(newUser.lastName);
                expect(res.body.username).to.equal(newUser.username);
                expect(res.body.password).to.equal(newUser.password);
                expect(res.body.email).to.equal(newUser.email);
                return User.findById(res.body['_id']);
            })
            .then(function(user) {
                expect(user.firstName).to.equal(newUser.firstName);
                expect(user.lastName).to.equal(newUser.lastName);
                expect(user.username).to.equal(newUser.username);
                expect(user.password).to.equal(newUser.password);
                expect(user.email).to.equal(newUser.email);
            });
        });
    });

    //PUT endpoint
    describe('PUT endpoint', function() {
        it('Should update only the fields the user sends over', function() {
            const updateData = {
                username: faker.internet.userName(),
                email: faker.internet.email()
            }
            return User
                .findOne()
                .then(function(user) {
                    updateData.id = user['_id'];
                    return chai.request(app)
                        .put(`/users/${updateData.id}`)
                        .send(updateData);
                })
                .then(function(res) {
                    expect(res).to.have.status(204);
                    return User.findById(updateData.id);
                })
                .then(function(user) {
                    expect(user.username).to.equal(updateData.username);
                    expect(user.email).to.equal(updateData.email);
                });
        });
    });

    //DELETE enpoint 
    describe('DELETE enpoint', function() {
        
        it('Should delete an user with an id', function() {
            let user;
            return User 
                .findOne()
                .then(function(_user) {
                    user = _user;
                    return chai.request(app).delete(`/users/${user.id}`);
                })
                .then(function(res) {
                    expect(res).to.have.status(204);
                    return User.findById(user.id);
                })
                .then(function(_user) {
                    expect(_user).to.be.null;
                });
        });
    });
});