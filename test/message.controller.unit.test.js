const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const response = require("./mocks/messages")
const MongooseError = require('mongoose').Error;

const MessageService = require('../services/message')
const MessageController = require('../controllers/message')


describe("Message Restful API Unit Test", function () {
  describe("Create New Message", function () {
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(function () {
      MessageService.create.restore();
    });

    it("create new message, correct format - should return true", async function () {
      const req = { body: { message: "test" } }
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: "test",
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }

      const stub = sinon.stub(MessageService, "create")
      .withArgs(req.body.message)
      .returns(stubValue);
      await MessageController.create(req, res);

      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);
      expect(json.args[0][0].result).to.eql(stubValue);
      expect(json.args[0][0].success).to.eql(true);

    });

    it("create new message, empty message content - should return false", async function () {
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: "test",
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }
      const stub = sinon.stub(MessageService, "create").withArgs(stubValue.message).returns(
        stubValue);
      const req = { body: { message: "" } }
      await MessageController.create(req, res);

      //should not invoke service.create
      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('message content missing.');
      expect(json.args[0][0].success).to.eql(false);

    });

    it("create new message, malformed payload - should return false", async function () {
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: "test",
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }
      const stub = sinon.stub(MessageService, "create").withArgs(stubValue.message).returns(
        stubValue);
      const req = { body: { message1: "madam" } }
      await MessageController.create(req, res);

      //should not invoke service.create
      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('malformed payload.');
      expect(json.args[0][0].success).to.eql(false);
    });

  });

  describe("Update Existing Message", function () {
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(function () {
      MessageService.updateById.restore();
    });

    it("update message, malformed payload - should not passing controller validation", async function () {

      const _id = "6070fd202366b95c2cb52cdc"
      const req = { body: { malformed_message_payload: "test" }, params: { id: _id } }
      const stub =
        sinon.stub(MessageService, "updateById")
        .withArgs(req.body.malformed_message_payload, _id)
        .throws(new MongooseError.CastError(''));

      await MessageController.updateById(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].success).to.eql(false);
      expect(json.args[0][0].message).to.eql('malformed payload.');

    });

    it("update message, empty message content - should not passing controller validation", async function () {
      const _id = "6070fd202366b95c2cb52cdc"
      const req = { body: { message: "" }, params: { id: _id } }
      const stub =
        sinon.stub(MessageService, "updateById")
        .withArgs(req.body.message, _id)
        .throws(new MongooseError.CastError(''));
      await MessageController.updateById(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].success).to.eql(false);
      expect(json.args[0][0].message).to.eql('message content missing.');

    });

    it("update message, malformed path params id - should not passing controller validation", async function () {
      const req = { body: { message: "test5" }, params: { id: "none-exisit-id" } }

      const stub =
        sinon.stub(MessageService, "updateById")
        .withArgs(req.body.message, req.body.id)
        .throws(new MongooseError.CastError(''));

      await MessageController.updateById(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('invalid path params id.');
      expect(json.args[0][0].success).to.eql(false);

    });

    it("update message, none exist id path params id - should not passing controller validation", async function () {
      const req = { body: { message: "test5" }, params: { id: "123456789012" } }
      const getStub =
        sinon.stub(MessageService, "getById")
        .withArgs(req.body.message, req.params.id)
        .throws(new Error('record not found'));
      const stub = sinon.stub(MessageService, "updateById")

      try{
        await MessageController.updateById(req, res);
      }
      catch (error){
        expect(stub.calledOnce).to.be.false;
        expect(getStub.calledOnce).to.be.true;
        expect(status.calledOnce).to.be.true;
        expect(status.args[0][0]).to.equal(404);
        expect(json.args[0][0].message).to.eql('record not found.');
        expect(json.args[0][0].success).to.eql(false);
      }
      MessageService.getById.restore();
    });

  });

  describe("Get One Message", function () {
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(function () {
      MessageService.getById.restore();
    });

    it("get one message, valid message id - should return true", async function () {
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: "test",
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }
      const stub = sinon.stub(MessageService, "getById").withArgs(stubValue._id).returns(stubValue);
      const req = { params: { id: stubValue._id } }
      await MessageController.getById(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0].success).to.eql(true);
      expect(json.args[0][0].result).to.eql(stubValue);

    });

    it("get one message, malformed path params id - should not passing controller validation", async function () {
      const _id = "malformed_object_id";

      //override getById to throw execution
      const stub = sinon.stub(MessageService, "getById").withArgs(_id).throws(new MongooseError.CastError(''))
      const req = { params: { id: "malformed_object_id" } }
      await MessageController.getById(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].success).to.eql(false);
      expect(json.args[0][0].message).to.eql('invalid path params id.');
    });

    it("get one message, none exist id path params id - should passing validation but return null in service", async function () {
      const stubValue = null;
      const req = { params: { id: "123456789012" } }

      const stub = sinon.stub(MessageService, "getById").withArgs(req.params.id).returns(stubValue);
      await MessageController.getById(req, res);

      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.args[0][0].success).to.eql(false);
      expect(json.args[0][0].message).to.eql('record not found.');
    });
  });

  describe("Delete One Message", function () {
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(function () {
      MessageService.deleteById.restore();
    });

    it("delete one message, valid message id - should pass", async function () {
      const stubValue = {
        _id: require('mongoose').Types.ObjectId(),
        message: "test",
        palindromic: false,
        createAt: faker.date.past(),
        updatedAt: faker.date.past()
      }

      const getStub = sinon.stub(MessageService, "getById").withArgs(stubValue._id).returns(stubValue);
      const stub = sinon.stub(MessageService, "deleteById").withArgs(stubValue._id).returns(stubValue);
      const req = { params: { id: stubValue._id } }
      await MessageController.deleteById(req, res);

      expect(getStub.calledOnce).to.be.true;
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0].result).to.eql(`message ${stubValue._id} deleted`);
      expect(json.args[0][0].success).to.eql(true);
      MessageService.getById.restore();

    });

    it("delete one message, malformed path params id - should not pass controller validation", async function () {
      const stub = sinon.stub(MessageService, "deleteById")
      const req = { params: { id: "malformed_object_id" } }
      await MessageController.deleteById(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].message).to.eql('invalid path params id.');
      expect(json.args[0][0].success).to.eql(false);
    });

    it("delete one message, none exist path params id - should pass controller validation but return null in service and return error", async function () {
      const stubValue = null;
      const stub = sinon.stub(MessageService, "deleteById").returns(stubValue);
      const getStub = sinon.stub(MessageService, "getById").returns(stubValue);
      const req = { params: { id: "123456789012" } }
      await MessageController.deleteById(req, res);

      expect(getStub.calledOnce).to.be.true;
      expect(stub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.args[0][0].message).to.eql('record not found.');
      expect(json.args[0][0].success).to.eql(false);

      MessageService.getById.restore();
    });
  });


  describe("List Messages", function () {
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    afterEach(function () {
      MessageService.getList.restore();
      MessageService.count.restore();
    });

    it('get message list, no filter, use default pagination - should return true',
      async function () {
        const stub = sinon.stub(MessageService, "getList").returns(response.messages);
        const countStub = sinon.stub(MessageService, "count").returns(response.messages.length)
        const req = { query: {} };
        await MessageController.getList(req, res);

        //console.log(res.json())
        expect(stub.calledOnce).to.be.true;
        expect(countStub.calledOnce).to.be.true;
        expect(status.calledOnce).to.be.true;
        expect(json.calledOnce).to.be.true;
        expect(status.args[0][0]).to.equal(200);
        expect(json.args[0][0].success).to.eql(true);
        expect(json.args[0][0].result.data).to.eql(response.messages);
        expect(json.args[0][0].result.currentPage).to.eql(1);
        expect(json.args[0][0].result.totalPages).to.eql(Math.ceil(response.messages.length / 10));
        expect(json.args[0][0].result.records).to.eql(response.messages.length);

      });

    it('get message list, filter palindromic=1, use default pagination - should return true',
      async function () {
        const messages = response.messages.filter(item => item.palindromic === true);
        const stub = sinon.stub(MessageService, "getList").returns(messages);
        const countStub = sinon.stub(MessageService, "count").returns(messages.length)
        const req = { query: { palindromic: 1 } };
        await MessageController.getList(req, res);

        expect(stub.calledOnce).to.be.true;
        expect(countStub.calledOnce).to.be.true;
        expect(status.calledOnce).to.be.true;
        expect(json.calledOnce).to.be.true;
        expect(status.args[0][0]).to.equal(200);
        expect(json.args[0][0].success).to.eql(true);
        expect(json.args[0][0].result.data).to.eql(messages);
        expect(json.args[0][0].result.currentPage).to.eql(1);
        expect(json.args[0][0].result.totalPages).to.eql(Math.ceil(messages.length / 10));
        expect(json.args[0][0].result.records).to.eql(messages.length);

      });

    it('get message list, filter palindromic=0, use default pagination - should return true',
      async function () {
        const totalRecord = response.messages.filter(item => item.palindromic === false).length;
        const stub = sinon.stub(MessageService, "getList").returns(response.messages);
        const countStub = sinon.stub(MessageService, "count").returns(totalRecord)
        const req = { query: { palindromic: 1 } };
        await MessageController.getList(req, res);

        expect(stub.calledOnce).to.be.true;
        expect(countStub.calledOnce).to.be.true;
        expect(status.calledOnce).to.be.true;
        expect(json.calledOnce).to.be.true;
        expect(status.args[0][0]).to.equal(200);
        expect(json.args[0][0].success).to.eql(true);
        expect(json.args[0][0].result.data).to.eql(response.messages);
        expect(json.args[0][0].result.currentPage).to.eql(1);
        expect(json.args[0][0].result.totalPages).to.eql(Math.ceil(response.messages.length / 10));
        expect(json.args[0][0].result.records).to.eql(totalRecord);

      });

    it('get message list, no filter, use page=2&size=3 - should return true', async function () {
      let page = "2", size = "3";

      //simulate pagination
      const messages = response.messages.slice((page - 1) * size, page * size);

      const stub = sinon.stub(MessageService, "getList").returns(messages);
      const countStub = sinon.stub(MessageService, "count").returns(messages.length)
      const req = { query: { page, size } };
      await MessageController.getList(req, res);

      expect(stub.calledOnce).to.be.true;
      expect(countStub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0].success).to.eql(true);
      expect(json.args[0][0].result.data).to.eql(messages);
      expect(json.args[0][0].result.currentPage).to.eql(+page);
      expect(json.args[0][0].result.totalPages).to.eql(Math.ceil(messages.length / 10));
      expect(json.args[0][0].result.records).to.eql(messages.length);
      expect(json.args[0][0].result.data[0]._id).to.eql('606feb8fa7730c4975962806');
      expect(json.args[0][0].result.data[1]._id).to.eql('606feb9ea7730c4975962807');
      expect(json.args[0][0].result.data[2]._id).to.eql('606feba0a7730c4975962808');

    });

    it('get message list, no filter, size=5 - should return true', async function () {
      let page = "1";
      let size = "5";

      //simulate pagination
      const messages = response.messages.slice(0, 5);
      const stub = sinon.stub(MessageService, "getList").returns(messages);
      const countStub = sinon.stub(MessageService, "count").returns(messages.length)
      const req = { query: { page, size } };
      await MessageController.getList(req, res);

      expect(stub.calledOnce).to.be.true;
      expect(countStub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0].success).to.eql(true);
      expect(json.args[0][0].result.data).to.eql(messages);
      expect(json.args[0][0].result.currentPage).to.eql(+page);
      expect(json.args[0][0].result.totalPages).to.eql(Math.ceil(messages.length / 10));
      expect(json.args[0][0].result.records).to.eql(messages.length);
      expect(json.args[0][0].result.data[4]._id).to.eql('606feb9ea7730c4975962807');
    });

    it('get message list, invalid query params sort=ID - should return false', async function () {
      const messages = response.messages;
      const stub = sinon.stub(MessageService, "getList").returns(messages);
      const countStub = sinon.stub(MessageService, "count").returns(messages.length)
      const req = { query: { sort: "ID" } };
      await MessageController.getList(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(countStub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].success).to.eql(false);
      expect(json.args[0][0].message).to.eql('invalid query params sort.');
    });

    it('get message list, invalid query params sort = whitespace - should return false',
      async function () {
        const messages = response.messages;
        const stub = sinon.stub(MessageService, "getList").returns(messages);
        const countStub = sinon.stub(MessageService, "count").returns(messages.length)
        const req = { query: { sort: " " } };
        await MessageController.getList(req, res);

        expect(stub.calledOnce).to.be.false;
        expect(countStub.calledOnce).to.be.false;
        expect(status.calledOnce).to.be.true;
        expect(json.calledOnce).to.be.true;
        expect(status.args[0][0]).to.equal(400);
        expect(json.args[0][0].success).to.eql(false);
        expect(json.args[0][0].message).to.eql('invalid query params sort.');
      });

    it('get message list, sort not in allowed sort list - should return false', async function () {
      const messages = response.messages;
      const stub = sinon.stub(MessageService, "getList").returns(messages);
      const countStub = sinon.stub(MessageService, "count").returns(messages.length)
      const req = { query: { sort: "-__v" } };
      await MessageController.getList(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(countStub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].success).to.eql(false);
      expect(json.args[0][0].message).to.eql('invalid query params sort.');
    });

    it('get message list, page = -5 - should return false', async function () {
      const messages = response.messages;
      const stub = sinon.stub(MessageService, "getList").returns(messages);
      const countStub = sinon.stub(MessageService, "count").returns(messages.length)
      const req = { query: { page: "-5" } };
      await MessageController.getList(req, res);

      expect(stub.calledOnce).to.be.false;
      expect(countStub.calledOnce).to.be.false;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(400);
      expect(json.args[0][0].success).to.eql(false);
      expect(json.args[0][0].message).to.eql('query params page must be a postive integer.');
    });

    it('get message list, page = 101 - should return true', async function () {
      const stub = sinon.stub(MessageService, "getList").returns(response.messages);
      const countStub = sinon.stub(MessageService, "count").returns(response.messages.length)
      const req = { query: { size: "101" } };
      await MessageController.getList(req, res);

      //console.log(res.json())
      expect(stub.calledOnce).to.be.true;
      expect(countStub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(json.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.args[0][0].success).to.eql(true);
      expect(json.args[0][0].result.data).to.eql(response.messages);
      expect(json.args[0][0].result.currentPage).to.eql(1);
      expect(json.args[0][0].result.totalPages).to.eql(Math.ceil(response.messages.length / 10));
      expect(json.args[0][0].result.records).to.eql(response.messages.length);
    });
  });
});
