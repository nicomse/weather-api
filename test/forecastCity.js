//Require the dependencies
let app = require('../server');
let chai = require('chai');
const should = require('chai').should()
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/GET forecastCity', () => {
  it('it should return the forecast via GET data about a default IP address', (done) => {
    chai.request(app)
      .get('/v1/forecast')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.location.should.be.a('string');
          res.body.forecast.should.be.a('array');
          res.body.should.be.a('object');
          done();
      });
  });
  it('it should return the forecast about specific city', (done) => {
    chai.request(app)
      .get('/v1/forecast/London')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.location.should.be.a('string');
          res.body.forecast.should.be.a('array');
          res.body.should.be.a('object');
          done();
      });
  });
  it('it should return via GET an error sending a wrong location', (done) => {
    chai.request(app)
      .get('/v1/forecast/aaa')
      .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          done();
      });
  });
});
