const messageService = require('../services/message')
const {StatusCodes: HttpStatusCode} = require('http-status-codes');
const responseFormatter = require("../utils/response");
const {isValidObjectId} = require("../utils/validator");
const debug = require('debug')('message-service:server');

module.exports = {
  create: async (req, res, next) => {
    const { message } = req.body;

    try {
      if(typeof message == 'undefined'){
        return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('malformed payload.'));
      }

      if(message.trim() === ''){
        return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('message content missing.'));
      }

      const result = await messageService.create(message);
      return res.status(HttpStatusCode.CREATED).json(responseFormatter.ok(result));
    }
    catch (err) {
      console.log(err)
      return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(responseFormatter.error("save message failed", err));
    }
  },
  updateById: async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;

    if(typeof message == 'undefined'){
      return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('malformed payload.'));
    }

    if(message.trim() === ''){
      return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('message content missing.'));
    }

    if(!isValidObjectId(id)){
      return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('invalid path params id.'));
    }

    try {
      const searchResult = await messageService.getById(id);
      if(searchResult === null){
        return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(responseFormatter.error(`record not found.`));
      }
      const result = await messageService.updateById(message, id);
      return res.status(HttpStatusCode.OK).json(responseFormatter.ok(result));
    }
    catch (err) {
      console.log(err)
      return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(responseFormatter.error(`update message ${id} failed`, err));
    }
  },
  deleteById: async (req, res) => {
    const { id } = req.params;
    if(!isValidObjectId(id)){
      return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('invalid path params id.'));
    }

    try {
      const searchResult = await messageService.getById(id);
      if(searchResult === null){
        return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(responseFormatter.error(`record not found.`));
      }
      await messageService.deleteById(id);
      return res
      .status(HttpStatusCode.OK)
      .json(responseFormatter.ok(`message ${id} deleted` ));
    }
    catch (err) {
      return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(responseFormatter.error(`delete message ${id} failed`, err));
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;

    if(!isValidObjectId(id)){
      return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('invalid path params id.'));
    }

    try {
      const message = await messageService.getById(id);
      if(message === null){
        return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(responseFormatter.error(`record not found.`));
      }
      return res.status(HttpStatusCode.OK).json(responseFormatter.ok(message));
    }
    catch (err) {
      return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(responseFormatter.error(`retrieve message ${id} failed`, err));
    }
  },
  list: async (req, res) => {
    try {
      const messages = await messageService.list(req.query);
      return res.status(HttpStatusCode.OK).json(responseFormatter.ok(messages));
    }
    catch (err) {

      return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(responseFormatter.error("retrieve message list failed", err));
    }
  },
};
