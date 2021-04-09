const sinon = require('sinon');
const MessageController = require('../../controllers/message')
const response = require('../response/message')

describe('Message Controller Unit Test', () => {
  let req = {
    body: {
      message: "my random test message 02"
    }
  };
  let error = new Error({ error: "blah blah" });
  let res = {};
  let expectedResult;

  describe('create', () => {
    beforeEach(function () {
      res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() })
      };
    });

    it('should return new message in response', sinon.test(function() {
      expectedResult = response.createSuccess;
      this.stub(MessageController, 'create').yields(null, expectedResult);
      MessageController.create(req, res);
      sinon.assert.calledWith(MessageController.create, req.body);
      sinon.assert.calledWith(res.json, sinon.match({}))
    }));

  });

});
