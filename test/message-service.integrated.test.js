
const chai = require("chai");
const expect = chai.expect;
const server = require('../bin/www');
const cloneDeep = require('lodash').cloneDeep;

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const MessageService = require('../services/message')
const MessageModal = require('../models/message')

const mockData = require('./mocks/intergration.data');
const apiEndpoint = process.env.API_ENDPOINT;
console.log(apiEndpoint)
describe('GET /messages', function (){
  //create insert mock data to db
  before(async function(){
    await MessageModal.deleteMany({});
    for( const item of mockData.messages){
      await MessageService.create(item.message)
    }
  });

  after(async function(){
    await MessageModal.deleteMany({});
  });

  it('should return all messages with default pagination orderby createAt desc', function(done){
    chai.request(server).get(`${apiEndpoint}/messages`).end(function(err, res){
       //simulate created at desc order
       const expectMessages = cloneDeep(mockData.messages).reverse();

       expect(res.status).be.equal(200);
       expect(res.body.result).to.be.a('object');
       expect(res.body.result.data).to.a('array');
       expect(res.body.result.currentPage).to.equal(1);
       expect(res.body.result.totalPages).to.equal(1);
       expect(res.body.result.totalRecords).to.equal(expectMessages.length);
       for (let i = 0; i < expectMessages.length; i++){
         expect(res.body.result.data[i].message).to.be.contains(expectMessages[i].message);
         expect(res.body.result.data[i].palindromic).to.be.equal(expectMessages[i].palindromic);
       }
       done();
     });
  });

  it('should return messages with filter palindromic=1 orderby createAt desc', function(done){
    chai.request(server).get(`${apiEndpoint}/messages?palindromic=1`).end(function(err, res){
      const expectMessages = cloneDeep(mockData.messages).reverse().filter(item => item.palindromic === true);
      expect(res.status).be.equal(200);
      expect(res.body.result).to.be.a('object');

      expect(res.body.result.data).to.a('array');
      expect(res.body.result.currentPage).to.equal(1);
      expect(res.body.result.totalPages).to.equal(1);
      expect(res.body.result.totalRecords).to.equal(expectMessages.length);

      for (let i = 0; i < expectMessages.length; i++){
        expect(res.body.result.data[i].message).to.be.contains(expectMessages[i].message);
        expect(res.body.result.data[i].palindromic).to.be.equal(expectMessages[i].palindromic);
      }
      done();
    });
  });

  it('should return messages with filter palindromic=0 page=2 size=3 orderby createdAt asc', function(done){
    chai.request(server).get(`${apiEndpoint}/messages?palindromic=0&page=2&size=3&sort=%2BcreatedAt`).end(function(err, res){
      let expectMessages = cloneDeep(mockData.messages).filter(item => item.palindromic === false);
      let pagedExpectMessages = expectMessages.slice(3, 6);
      expect(res.status).be.equal(200);
      expect(res.body.result).to.be.a('object');

      expect(res.body.result.data).to.a('array');
      expect(res.body.result.currentPage).to.equal(2);
      expect(res.body.result.totalPages).to.equal(2);
      expect(res.body.result.totalRecords).to.equal(expectMessages.length);
      for (let i = 0; i < pagedExpectMessages.length; i++){
        expect(res.body.result.data[i].message).to.be.contains(pagedExpectMessages[i].message);
        expect(res.body.result.data[i].palindromic).to.be.equal(pagedExpectMessages[i].palindromic);
      }
      done();
    });
  });

});

describe('POST /messages', function (){
  before(async function(){
    await MessageModal.deleteMany({});
  });

  it('should create a new message palindromic = false', function(done){
    const payload = { message: "test" }
    chai
    .request(server)
    .post(`${apiEndpoint}/messages`)
    .send(payload)
    .end(function(err, res){
      expect(res.status).be.equal(201);
      expect(res.body.result).to.be.a('object');

      expect(res.body.result.message).to.equal(payload.message);
      expect(res.body.result.palindromic).to.equal(false);
      done();
    })
  });

  it('should create a new message palindromic = true', function(done){
    const payload = { message: "madam" }
    chai
    .request(server)
    .post(`${apiEndpoint}/messages`)
    .send(payload)
    .end(function(err, res){
      expect(res.status).be.equal(201);
      expect(res.body.result).to.be.a('object');

      expect(res.body.result.message).to.equal(payload.message);
      expect(res.body.result.palindromic).to.equal(true);
      done();
    })
  });

  it('should fail on creating a new message with malformed payload', function(done){
    const payload = { message1: "madam" }
    chai
    .request(server)
    .post(`${apiEndpoint}/messages`)
    .send(payload)
    .end(function(err, res){

      expect(res.status).be.equal(400);
      expect(res.body.result).to.equal(null);
      expect(res.body.message).to.equal('malformed payload.');
      done();
    })
  });

  it('should fail on creating a new message with message empty', function(done){
    const payload = { message: "   " }
    chai
    .request(server)
    .post(`${apiEndpoint}/messages`)
    .send(payload)
    .end(function(err, res){

      expect(res.status).be.equal(400);
      expect(res.body.result).to.equal(null);
      expect(res.body.message).to.equal('message content missing.');
      done();
    })
  });


});


describe('PUT /messages', function (){
  let newMessage;
  beforeEach(async function(){
    await MessageModal.deleteMany({});

    //each time create a message doc for updating use
    newMessage = new MessageModal({
      message: "data",
      palindromic: false
    })
    await newMessage.save()
  });

  afterEach(async function(){
    await MessageModal.deleteMany({});
  });

  it('should update an existing message with palindromic = false', function(done){
    const payload = { message: "test updated" }
    chai
    .request(server)
    .put(`${apiEndpoint}/messages/${newMessage._id}`)
    .send(payload)
    .end(function(err, res){
      expect(res.status).be.equal(200);
      expect(res.body.result).to.be.a('object');

      expect(res.body.result.message).to.equal(payload.message);
      expect(res.body.result.palindromic).to.equal(false);
      done();
    })
  });

  it('should update an existing message with palindromic = true', function(done){
    const payload = { message: "mom" }
    chai
    .request(server)
    .put(`${apiEndpoint}/messages/${newMessage._id}`)
    .send(payload)
    .end(function(err, res){
      expect(res.status).be.equal(200);
      expect(res.body.result).to.be.a('object');

      expect(res.body.result.message).to.equal(payload.message);
      expect(res.body.result.palindromic).to.equal(true);
      done();
    })
  });

  it('should fail on updating an existing message with malformed payload', function(done){
    const payload = { message1: "madam" }
    chai
    .request(server)
    .put(`${apiEndpoint}/messages/${newMessage._id}`)
    .send(payload)
    .end(function(err, res){

      expect(res.status).to.be.equal(400);
      expect(res.body.result).to.be.equal(null);
      expect(res.body.result).to.equal(null);
      expect(res.body.message).to.equal('malformed payload.');
      done();
    })
  });

  it('should fail on updating an existing message with message empty', function(done){
    const payload = { message: "   " }
    chai
    .request(server)
    .put(`${apiEndpoint}/messages/${newMessage._id}`)
    .send(payload)
    .end(function(err, res){

      expect(res.status).be.equal(400);
      expect(res.body.result).to.be.equal(null);
      expect(res.body.result).to.equal(null);
      expect(res.body.message).to.equal('message content missing.');
      done();
    })
  });

  it('should fail on updating a none-existing message', function(done){
    const payload = { message: "  1 " }
    chai
    .request(server)
    .put(`${apiEndpoint}/messages/6070fd132366b95c2cb52cd9`)
    .send(payload)
    .end(function(err, res){

      expect(res.status).be.equal(404);
      expect(res.body.result).to.be.equal(null);
      expect(res.body.result).to.equal(null);
      expect(res.body.message).to.equal('record not found.');
      done();
    })
  });
});


describe('DELETE /messages', function (){
  let newMessage;
  beforeEach(async function(){
    await MessageModal.deleteMany({});

    //each time create a message doc for updating use
    newMessage = new MessageModal({
      message: "data",
      palindromic: false
    })
    await newMessage.save()
  });

  afterEach(async function(){
    await MessageModal.deleteMany({});
  });

  it('should delete an existing message ', function(done){
    chai
    .request(server)
    .delete(`${apiEndpoint}/messages/${newMessage._id}`)
    .end(function(err, res){
      expect(res.status).be.equal(200);

      done();
    })
  });

  it('should fail on deleting a none-existing message', function(done){
    chai
    .request(server)
    .delete(`${apiEndpoint}/messages/6070fd132366b95c2cb52cd9`)
    .end(function(err, res){
      expect(res.status).be.equal(404);
      expect(res.body.result).to.be.equal(null);
      expect(res.body.result).to.equal(null);
      expect(res.body.message).to.equal('record not found.');
      done();
    })
  });

  it('should fail on deleting a malformed id', function(done){
    chai
    .request(server)
    .delete(`${apiEndpoint}/messages/invalidobjectid`)
    .end(function(err, res){

      expect(res.status).be.equal(400);
      expect(res.body.result).to.be.equal(null);
      expect(res.body.result).to.equal(null);
      expect(res.body.message).to.equal('invalid path params id.');
      done();
    })
  });
});

describe('GET /messages/{id}', function (){
  let newMessage;
  beforeEach(async function(){
    await MessageModal.deleteMany({});

    //each time create a message doc for updating use
    newMessage = new MessageModal({
      message: "data",
      palindromic: false
    })
    await newMessage.save()
  });

  afterEach(async function(){
    await MessageModal.deleteMany({});
  });

  it('should get an existing message ', function(done){
    chai
    .request(server)
    .get(`${apiEndpoint}/messages/${newMessage._id}`)
    .end(function(err, res){
      expect(res.status).be.equal(200);
      expect(res.body.result).to.be.a('object');

      expect(res.body.result.message).to.equal(newMessage.message);
      expect(res.body.result.palindromic).to.equal(false);
      done();
    })
  });

  it('should fail on getting a none-existing message', function(done){
    chai
    .request(server)
    .get(`${apiEndpoint}/messages/6070fd132366b95c2cb52cd9`)
    .end(function(err, res){
      expect(res.status).be.equal(404);
      expect(res.body.result).to.be.equal(null);
      expect(res.body.result).to.equal(null);
      expect(res.body.message).to.equal('record not found.');
      done();
    })
  });

  it('should fail on getting a malformed id', function(done){
    chai
    .request(server)
    .get(`${apiEndpoint}/messages/invalidobjectid`)
    .end(function(err, res){
      expect(res.status).be.equal(400);
      expect(res.body.result).to.be.equal(null);
      expect(res.body.result).to.equal(null);
      expect(res.body.message).to.equal('invalid path params id.');
      done();
    })
  });
});

describe('Express Server middleware test', function (){
  after(function(){
    setTimeout(function () {
      //wait 5 seconds to generate summary of test cases then exit the application
      process.exit();
    }, 5000);
  });
  it('none exist route should return 404', function (done){
    chai
    .request(server)
    .get(`${apiEndpoint}/none-exist-resources`)
    .end(function(err, res){

      expect(res.status).be.equal(404);
      expect(res.body.err).to.be.a('object');
      expect(res.body.err.message).to.be.equal('Not Found');
      done();
    })
  })

  it('payload over 1mb should return http status code 413', function (done){
    const data = require('./mocks/over1mb.json');
    chai
    .request(server)
    .post(`${apiEndpoint}/none-exist-resources`)
    .send(data)
    .end(function(err, res){

      expect(res.status).be.equal(413);
      expect(res.body.err).to.be.a('object');
      expect(res.body.err.message).to.be.equal('request entity too large');
      done();
    })
  })


});




