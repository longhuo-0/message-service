const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");


//const Message = require('../models/message');
const MessageService = require('../services/message')
const MessageController = require('../controllers/message')



describe("Message Restful API Unit Test", function (){
  describe("Create New Message", function (){
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(function() {
      MessageService.create.restore();
    });

    it("create new message, correct format - should return true",  async function (){
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: "test",
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }
      const stub = sinon.stub(MessageService, "create").returns(stubValue);
      const req = {body: {message: "test"}}
      await MessageController.create(req, res);

      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.args[0][0].result).to.eql(stubValue);

    });

    it("create new message, empty message content - should return false",  async function (){
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: "test",
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }
      const stub = sinon.stub(MessageService, "create").returns(stubValue);
      const req = {body: {message: ""}}
      await MessageController.create(req, res);

      //should not invoke service.create
      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('message content missing.');

    });

    it("create new message, malformed payload - should return false",  async function (){
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: "test",
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }
      const stub = sinon.stub(MessageService, "create").returns(stubValue);
      const req = {body: {message1 : "madam"}}
      await MessageController.create(req, res);

      //should not invoke service.create
      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('malformed payload.');

    });

  });

  describe("Update Existing Message", function (){
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(function() {
      MessageService.updateById.restore();
    });

    it("update message, malformed payload - should return false",  async function (){
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: "test",
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }
      const stub = sinon.stub(MessageService, "updateById").returns(stubValue);
      const req = {body: {message1: "test"}, params: {id: stubValue.id}}
      await MessageController.updateById(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('malformed payload.');

    });

    it("update message, empty message content - should return false",  async function (){
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: "test",
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }
      const stub = sinon.stub(MessageService, "updateById").returns(stubValue);
      const req = {body: {message: ""}, params: {id: stubValue.id}}
      await MessageController.updateById(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('message content missing.');

    });

    it("update message, malformed path params id - should return false",  async function (){
      const stubValue = null;
      //override getById to throw execution
      //const getStub = sinon.stub(MessageService, "getById").returns(stubValue);
      const stub = sinon.stub(MessageService, "updateById")
      const req = {body: {message: "test5"}, params: {id: "none-exisit-id"}}
      await MessageController.updateById(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('invalid path params id.');

      //MessageService.getById.restore();
    });

    it("update message, none exist id path params id - should return false",  async function (){
      const stubValue = null;
      //override getById to throw execution
      const getStub = sinon.stub(MessageService, "getById").returns(stubValue);
      const stub = sinon.stub(MessageService, "updateById")
      const req = {body: {message: "test5"}, params: {id: "123456789012"}}
      await MessageController.updateById(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(getStub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('record not found.');

      MessageService.getById.restore();
    });

  });

  describe("Get One Message", function(){
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(function() {
      MessageService.getById.restore();
    });

    it("get one message, valid message id - should return true",  async function (){
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: "test",
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }
      const stub = sinon.stub(MessageService, "getById").returns(stubValue);
      const req = {params: {id: stubValue._id}}
      await MessageController.getById(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0].result).to.eql(stubValue);

    });

    it("get one message, malformed path params id - should return false",  async function (){
      const stubValue = null;
      //override getById to throw execution
      //const getStub = sinon.stub(MessageService, "getById").returns(stubValue);
      const stub = sinon.stub(MessageService, "getById")
      const req = {params: {id: "malformed_object_id"}}
      await MessageController.getById(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('invalid path params id.');
    });

    it("get one message, none exist id path params id - should return false",  async function (){
      const stubValue = null;
      //override getById to throw execution
      const stub = sinon.stub(MessageService, "getById").returns(stubValue);
      const req = {params: {id: "123456789012"}}
      await MessageController.getById(req, res);

      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('record not found.');
    });
  });

  describe("Delete One Message", function(){
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(function() {
      MessageService.deleteById.restore();
    });

    it("delete one message, valid message id - should return true",  async function (){
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: "test",
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }

      const getStub = sinon.stub(MessageService, "getById").returns(stubValue);
      const stub = sinon.stub(MessageService, "deleteById").returns(stubValue);
      const req = {params: {id: stubValue._id}}
      await MessageController.deleteById(req, res);

      expect(getStub.calledOnce).to.be.true;
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0].result).to.eql(`message ${stubValue._id} deleted`);

      MessageService.getById.restore();

    });

    it("delete one message, malformed path params id - should return false",  async function (){
      const stub = sinon.stub(MessageService, "deleteById")
      const req = {params: {id: "malformed_object_id"}}
      await MessageController.deleteById(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('invalid path params id.');
    });

    it("delete one message, none exist path params id - should return false",  async function (){
      const stubValue = null;
      const stub = sinon.stub(MessageService, "deleteById").returns(stubValue);
      const getStub = sinon.stub(MessageService, "getById").returns(stubValue);
      const req = {params: {id: "123456789012"}}
      await MessageController.deleteById(req, res);

      expect(getStub.calledOnce).to.be.true;
      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('record not found.');

      MessageService.getById.restore();
    });
  });

});
