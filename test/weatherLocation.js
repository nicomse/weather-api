//Require the dependencies
let app = require('../server');
let chai = require('chai');
const should = require('chai').should()
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/GET weatherLocation', () => {
  it('it should GET my current location ', (done) => {
    chai.request(app)
      .get('/v1/location')
      .end((err, res) => {
        if (err) {
          done();
        } else {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        }
      });
  });
});
