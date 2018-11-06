const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Simple Test', function() {
    before(function() {
        return runServer();
    });
    // close server after testing
    after(function() {
        return closeServer();
    });

    it("Should get 200 server satus", function() {
        return chai.request(app)
        .get("/")
        .then(function(res) {
            expect(res).to.have.status(200);
        });
    });
});
