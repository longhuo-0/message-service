const messageService = require('../services/message')
const {StatusCodes: HttpStatusCode} = require('http-status-codes');
const responseFormatter = require("../utils/response");
const { canConvertToPositiveInteger } = require('../utils/stringHelper');
const {isValidObjectId} = require("../utils/validator");
const debug = require('debug')('message-service:server');



module.exports = {
  create: async (req, res, next) => {
    let message = req.body.message;
    try {
      if(typeof message === 'object' || typeof message === 'undefined'){
        return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('malformed payload.'));
      }
      message = message.toString();

      if(message.trim() === ''){
        return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('message content missing.'));
      }

      const result = await messageService.create(message);
      return res.status(HttpStatusCode.CREATED).json(responseFormatter.ok(result));
    }
    catch (err) {
      return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(responseFormatter.error("save message failed", err));
    }
  },
  updateById: async (req, res) => {
    const { id } = req.params;
    let message = req.body.message;

    if(typeof message === 'object' || typeof message === 'undefined'){
      return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('malformed payload.'));
    }
    message = message.toString();

    if(!message || message.trim() === ''){
      return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('message content missing.'));
    }

    if(!isValidObjectId(id)){
      return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('invalid path params id.'));
    }

    try {
      const searchResult = await messageService.getById(id);
      if(searchResult === null){
        return res
        .status(HttpStatusCode.NOT_FOUND)
        .json(responseFormatter.error(`record not found.`));
      }
      const result = await messageService.updateById(message, id);
      return res.status(HttpStatusCode.OK).json(responseFormatter.ok(result));
    }
    catch (err) {
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
        .status(HttpStatusCode.NOT_FOUND)
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
        .status(HttpStatusCode.NOT_FOUND)
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
  getList: async (req, res) => {
    try {
      let filter = {};
      let page = req.query.page || 1;
      let size = req.query.size || 10;
      let sort = req.query.sort || "-createdAt";

      //plain query will remove + sign
      if(sort.charAt(0) !== '-' && sort.charAt(0) !== '+'){
        sort = "+" + sort;
      }

      let sortable = ['createdAt', 'updatedAt', 'message', 'palindromic', '_id'];

      if(sort.trim() === ""){
        return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('invalid query params sort.'));
      }

      if(!sortable.includes(sort.substring(1))){
        return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('invalid query params sort.'));
      }

      if(!canConvertToPositiveInteger(page)){
        return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('query params page must be a postive integer.'));
      }

      if(!canConvertToPositiveInteger(size)){
        return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('invalid query params size.'));
      }

      size = (+size > 100) ? 100 : size;
      page = +page;

      if("palindromic" in req.query){
        //treat none "0" value to false
        filter.palindromic = req.query.palindromic === "0" ? false : true;
      }

      let pagination = {
        page: page - 1,
        size,
        sort : sort
      }
      const messages = await messageService.getList(filter, pagination);
      const totalRecords = await messageService.count(filter);
      const response = {
        data: messages,
        currentPage: page,
        totalPages: Math.ceil(totalRecords / size),
        totalRecords: totalRecords,
        currentSize: size
      }
      return res.status(HttpStatusCode.OK).json(responseFormatter.ok(response));
    }
    catch (err) {
      debug(err)
      return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(responseFormatter.error("retrieve message list failed", err));
    }
  },
};
