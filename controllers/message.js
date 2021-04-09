const messageService = require('../services/message')
const { StatusCode: HttpStatusCode } = require('status-code-enum');
const responseFormatter = require("../utils/response");
const debug = require('debug')('message-service:server');

module.exports = {
  create: async (req, res, next) => {
    const { message } = req.body;
    try {
      const result = await messageService.create(message);
      res.statusCode = HttpStatusCode.SuccessCreated;
      res.json(responseFormatter.ok(result));
    }
    catch (err) {
      res.statusCode = HttpStatusCode.ServerErrorInternal;
      res.json(responseFormatter.error("save message failed", err));
    }
  },
  updateById: async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    try {
      const result = await messageService.updateById(message, id);
      res.statusCode = HttpStatusCode.SuccessCreated;
      res.json(responseFormatter.ok(result));
    }
    catch (err) {
      res.statusCode = HttpStatusCode.ServerErrorInternal;
      res.json(responseFormatter.error(`update message ${id} failed`, err));
    }
  },
  deleteById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await messageService.deleteById(id);
      res.statusCode = HttpStatusCode.SuccessCreated;
      res.json(responseFormatter.ok(result, `message ${id} deleted`));
    }
    catch (err) {
      res.statusCode = HttpStatusCode.ServerErrorInternal;
      res.json(responseFormatter.error(`delete message ${id} failed`, err));
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const message = await messageService.getById(id);
      res.statusCode = HttpStatusCode.SuccessCreated;
      res.json(responseFormatter.ok(message));
    }
    catch (err) {
      res.statusCode = HttpStatusCode.ServerErrorInternal;
      res.json(responseFormatter.error(`retrieve message ${id} failed`, err));
    }
  },
  list: async (req, res) => {
    try {
      const messages = await messageService.list(req.query);
      res.statusCode = HttpStatusCode.SuccessCreated;
      res.json(responseFormatter.ok(messages));
    }
    catch (err) {
      res.statusCode = HttpStatusCode.ServerErrorInternal;
      res.json(responseFormatter.error("retrieve message list failed", err));
    }
  },
};
