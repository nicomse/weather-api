//Require the dependencies
let app = require('../server');
let chai = require('chai');
const should = require('chai').should()
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/GET specificCity', () => {
  it('it should return via GET data about a default IP address', (done) => {
    chai.request(app)
      .get('/v1/current')
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
  it('it should return via GET data about a specific city', (done) => {
    chai.request(app)
      .get('/v1/current/London')
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
  it('it should return via GET an error sending a wrong location', (done) => {
    chai.request(app)
      .get('/v1/current/aaa')
      .end((err, res) => {
        if (err) {
          done();
        } else {
          res.should.have.status(500);
          res.body.should.be.a('object');
          done();
        }
      });
  });
});
