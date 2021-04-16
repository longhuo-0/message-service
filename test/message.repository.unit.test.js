const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const response = require("./mocks/messages")
const MongooseError = require('mongoose').Error

const MessageService = require('../services/message')
const Message = require('../models/message');
const MessageRepository = require('../repositories/message');

describe("Message Repo Unit Test", function () {
  describe("create", function () {
    let status, json, res;

    afterEach(function () {
      //special stub due to message modal instance is dynamic create in create call
      Message.prototype.save.restore();
    });

    it("should create new message", async function () {
      const msg = "123321";
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: msg,
        palindromic: true,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }

      const stub = sinon.stub(Message.prototype, 'save').returns(stubValue);
      const message = await MessageRepository.create({
        message: msg,
        palindromic: true
      });

      expect(stub.calledOnce).to.be.true;
      expect(message._id).to.equal(stubValue._id);
      expect(message.message).to.equal(stubValue.message);
      expect(message.palindromic).to.equal(true);

    });

    it('should not save - simulate mongo general', async function () {
      const msg = "madam";
      const stub = sinon.stub(Message.prototype, "save").throws({ name: 'MongoError' });
      try {
        await MessageService.create(msg);
      }
      catch (error) {
        expect(stub.calledOnce).to.be.true;
        expect(error.name).to.be.equal('MongoError');
      }
    });

    it('should not save - simulate mongo error', async function () {
      const msg = "madam";
      const stub = sinon.stub(Message.prototype, "save")
      .throws(new MongooseError.ValidationError());
      try {
        await MessageService.create(msg);
      }
      catch (error) {
        expect(stub.calledOnce).to.be.true;
        expect(error).to.be.instanceof(MongooseError.ValidationError);
        expect(error.message).to.be.contains("Validation failed")
      }
    });
  });

  describe("get", function () {
    let status, json, res;

    afterEach(function () {
      MessageService.getById.restore();
    });

    it("get a message from a valid objectId, should pass", async function () {
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: "test123",
        palindromic: true,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }

      const stub = sinon.stub(MessageService, "getById").returns(stubValue);
      const message = await MessageService.getById("606feb8fa7730c4975962806");

      expect(stub.calledOnce).to.be.true;
      expect(message._id).to.equal(stubValue._id);
      expect(message.message).to.equal("test123");
      expect(message.palindromic).to.equal(true);
      expect(message.createdAt).to.equal(stubValue.createdAt);
      expect(message.updatedAt).to.equal(stubValue.updatedAt);
    });

    it('get message from invalid record objectId, should pass', async function () {
      const id = "6070fd162366b95c2cb52cda";
      const stub = sinon.stub(MessageService, "getById").returns(null);
      const message = await MessageService.getById(id);
      expect(stub.calledOnce).to.be.true;
      expect(message).to.be.equal(null);
    });

    it('get message from malformed objectId, should fail', async function () {
      const id = "b95c2cb52cda";
      const stub = sinon.stub(MessageService, "getById")
      .throws(new MongooseError.CastError(`Cast to ObjectId failed for value ${id}`));
      try {
        const message = await MessageService.getById(id);
      }
      catch (error) {
        expect(stub.calledOnce).to.be.true;
        expect(error).to.be.instanceof(MongooseError.CastError);
        expect(error.message).to.be.contains("Cast to ObjectId failed for value")
      }
    });
  });

  describe("update", function () {
    const mockUpdatedMessage = "updated message";
    afterEach(function () {
      MessageService.updateById.restore();
    });

    it("update a message with a valid objectId, should pass", async function () {

      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: mockUpdatedMessage,
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }

      const stub = sinon.stub(MessageService, "updateById").returns(stubValue);
      const message = await MessageService.updateById(mockUpdatedMessage,
        "606feb8fa7730c4975962806");

      expect(stub.calledOnce).to.be.true;
      expect(message._id).to.equal(stubValue._id);
      expect(message.message).to.equal(mockUpdatedMessage);
      expect(message.palindromic).to.equal(false);
      expect(message.createdAt).to.equal(stubValue.createdAt);
      expect(message.updatedAt).to.equal(stubValue.updatedAt);
    });

    it('update message from invalid record objectId, should return null', async function () {
      const id = "6070fd162366b95c2cb52cda";
      const stub = sinon.stub(MessageService, "updateById").returns(null);
      const message = await MessageService.updateById(mockUpdatedMessage, id);
      expect(stub.calledOnce).to.be.true;
      expect(message).to.be.equal(null);
    });

    it('update a message from malformed objectId, should throw error', async function () {
      const id = "b95c2cb52cda";
      const stub = sinon.stub(MessageService, "updateById")
      .throws(new MongooseError.CastError(`Cast to ObjectId failed for value ${id}`));
      try {
        const message = await MessageService.updateById(mockUpdatedMessage, id);
      }
      catch (error) {
        expect(stub.calledOnce).to.be.true;
        expect(error).to.be.instanceof(MongooseError.CastError);
        expect(error.message).to.be.contains("Cast to ObjectId failed for value")
      }
    });

    it('update a message from valid objectId, but message content is empty should throw error',
      async function () {
        const id = "b95c2cb52cda";
        const stub = sinon.stub(MessageService, "updateById")
        .throws(new MongooseError.ValidationError());
        try {
          const message = await MessageService.updateById("", id);
        }
        catch (error) {
          expect(stub.calledOnce).to.be.true;
          expect(error).to.be.instanceof(MongooseError.ValidationError);
          expect(error.message).to.be.contains("Validation failed")
        }
      });


  });

  describe("delete", function () {
    const mockUpdatedMessage = "Madam Wong"
    afterEach(function () {
      MessageRepository.deleteById.restore();
    });

    it("delete a message from a valid objectId, should pass", async function () {
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: mockUpdatedMessage,
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }

      const stub = sinon.stub(MessageRepository, "deleteById").returns(stubValue);
      const message = await MessageService.deleteById("606feb8fa7730c4975962806");

      expect(stub.calledOnce).to.be.true;
      expect(message._id).to.equal(stubValue._id);
      expect(message.message).to.equal(mockUpdatedMessage);
      expect(message.palindromic).to.equal(false);
      expect(message.createdAt).to.equal(stubValue.createdAt);
      expect(message.updatedAt).to.equal(stubValue.updatedAt);
    });

    it('get message from invalid record objectId, should return null', async function () {
      const id = "6070fd162366b95c2cb52cda";
      const stub = sinon.stub(MessageRepository, "deleteById")
      .throws(new Error("record not found"));
      try {
        const message = await MessageService.deleteById(id);
      }
      catch (error) {
        expect(stub.calledOnce).to.be.true;
        expect(error).to.be.instanceof(Error);
        expect(error.message).to.be.contains("record not found")
      }
    });

    it('get message from malformed objectId, should throw error', async function () {
      const id = "b95c2cb52cda";
      const stub = sinon.stub(MessageRepository, "deleteById")
      .throws(new MongooseError.CastError(`Cast to ObjectId failed for value ${id}`));
      try {
        const message = await MessageService.deleteById(id);
      }
      catch (error) {
        expect(stub.calledOnce).to.be.true;
        expect(error).to.be.instanceof(MongooseError.CastError);
        expect(error.message).to.be.contains("Cast to ObjectId failed for value")
      }
    });
  });

  describe("getList", function () {


    afterEach(function () {
      Message.find.restore();
    });

    it('get message list, no filter, use default pagination - should return array of messages',
      async function () {
        const filter = {};
        const pagination = { page: 0, size: 10, sort: '-createdAt' };

        // make chained return to simulate mongoose find mongoose api
        const stub = sinon.stub(Message, "find").returns({
          limit: (n) => {
            return {
              skip: (m) => {
                return {
                  sort: (w) => {
                    return {
                      exec: () => {
                        return new Promise((
                          resolve, reject) => {
                          resolve(response.messages);
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        });
        const messages = await MessageService.getList(filter, pagination);
        expect(stub.calledOnce).to.be.true;
        expect(messages).to.eql(response.messages);

      });

    it(
      'get message list, filter palindromic only, use default pagination - should return array of messages',
      async function () {
        const filter = { palindromic: true };
        const pagination = {};
        const mockMessages = response.messages.filter(item => item.palindromic === true);

        // make chained return to simulate mongoose find mongoose api
        const stub = sinon.stub(Message, "find").returns({
          limit: (n) => {
            return {
              skip: (m) => {
                return {
                  sort: (w) => {
                    return {
                      exec: () => {
                        return new Promise((
                          resolve, reject) => {
                          resolve(mockMessages);
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        });
        const messages = await MessageService.getList(filter, pagination);
        expect(stub.calledOnce).to.be.true;
        expect(messages).to.eql(mockMessages);

      });

    it(
      'get message list, filter palindromic false, use page=19 - should return array of messages',
      async function () {
        const filter = { palindromic: true };
        const pagination = {};
        const mockMessages = response.messages.filter(item => item.palindromic === true);

        // make chained return to simulate mongoose find mongoose api
        const stub = sinon.stub(Message, "find").returns({
          limit: (n) => {
            return {
              skip: (m) => {
                return {
                  sort: (w) => {
                    return {
                      exec: () => {
                        return new Promise((
                          resolve, reject) => {
                          resolve(mockMessages);
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        });
        const messages = await MessageService.getList(filter, pagination);
        expect(stub.calledOnce).to.be.true;
        expect(messages).to.eql(mockMessages);

      });
  });


});
