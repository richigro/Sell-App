const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
//generates data for testing
const faker = require('faker');

const { TEST_DATABASE_URL } = require('../config');
const { app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Simple Test', function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });
    // close server after testing
    after(function() {
        return closeServer();
    });
    // testing get endpoint for sale items
    it("Should get all items for sale on db", function() {
        return chai.request(app)
        .get("/for-sale")
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.items).to.be.a('array');
            expect(res.body.items.length).to.be.above(0);
            res.body.items.forEach(function(item) {
                expect(item).to.be.a('object');
                expect(item).to.have.all.keys('_id','name', 'contact', 'description', 'short-description', 'image', 'price', 'publishedAt');
            });

        });
    });
    //testing post item for sale
});
