//test env setup
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const response = require('../response/message')

const expect = chai.expect
chai.use(chaiHttp);


const baseURL = "http://localhost:3000/api/v1"
describe("message service controller unit tests",  (done) =>{
  beforeEach((done) => {
    nock(baseURL).get('/messages?limit=1').reply(200, response.messagesLimit1);
    nock(baseURL).get('/messages').reply(200, response.messages);
    done();
  });

  it('/messages should returns 6 messages', (done) => {
    chai.request(baseURL).get('/messages').end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body.success).to.be.equal(true);
      expect(res.body.result).to.be.an('array');
      expect(res.body.result.length).to.equal(6);
      done();
    });
  });

  it('/messages?limit=1 should return first record', (done) => {
    chai.request(baseURL).get('/messages?limit=1').end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('object');
      expect(res.body.success).to.be.equal(true);
      expect(res.body.result).to.be.an('array');
      expect(res.body.result.length).to.equal(1);
      expect(res.body.result[0]).to.include({
        "_id": "606feb13a7730c4975962803",
        "message": "123321",
        "palindromic": true,
        "createdAt": "2021-04-09T05:50:11.052Z",
        "updatedAt": "2021-04-09T05:50:11.052Z",
        "__v": 0
      });
      done();
    });
  });
});

