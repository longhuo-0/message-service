const userService = require('../services/user')
const {StatusCodes: HttpStatusCode} = require('http-status-codes');
const responseFormatter = require("../utils/response");
const { canConvertToPositiveInteger } = require('../utils/stringHelper');
const { isValidObjectId } = require("../utils/validator");
const debug = require('debug')('todo-service:api');


/**
 *  Parent Route /api/v1
 *  Response will be either wrapped in responseFormatter.ok or responseFormatter.error function
 */
module.exports = {
  /**
   * POST /messages handler
   * return newly created message
   */
  create: async (req, res, next) => {
    let {username, firstName, lastName} = req.body;
    try {
      const result = await userService.create({username, firstName, lastName});
      return res.status(HttpStatusCode.CREATED).json(responseFormatter.ok(result));
    }
    catch (err) {
      return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(responseFormatter.error("save message failed", err));
    }
  },
  /**
   * PUT /messages/:id handler
   * return updated message
   */
  updateById: async (req, res) => {
    const { id } = req.params;
    let {username, firstName, lastName} = req.body;
    try {
      const searchResult = await userService.getById(id);
      if(searchResult === null){
        return res
        .status(HttpStatusCode.NOT_FOUND)
        .json(responseFormatter.error(`record not found.`));
      }
      const result = await userService.updateById({ username, firstName, lastName }, id);
      return res.status(HttpStatusCode.OK).json(responseFormatter.ok(result));
    }
    catch (err) {
      return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(responseFormatter.error(`update user ${id} failed`, err));
    }
  },
  /**
   * DELETE /messages/:id handler
   * return message :id deleted
   */
  deleteById: async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error(
        'invalid path params id.'));
    }

    try {
      const searchResult = await userService.getById(id);
      if (searchResult === null) {
        return res
        .status(HttpStatusCode.NOT_FOUND)
        .json(responseFormatter.error(`record not found.`));
      }
      await userService.deleteById(id);
      return res
      .status(HttpStatusCode.OK)
      .json(responseFormatter.ok(`message ${id} deleted`));
    }
    catch (err) {
      return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(responseFormatter.error(`delete message ${id} failed`, err));
    }
  },
  /**
   * Get /users/:id handler
   * return searched message id
   */
  getById: async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error(
        'invalid path params id.'));
    }

    try {
      const message = await userService.getById(id);
      if (message === null) {
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
  /**
   * Get /messages handler
   * return list of messages
   */
  getList: async (req, res) => {
    try {
      let filter = {};
      let page = req.query.page || 1;
      let size = req.query.size || 10;
      let sort = req.query.sort || "-createdAt";

      //plain query will remove + char, urlencoded + sign will be converted correctly
      if (sort.charAt(0) !== '-' && sort.charAt(0) !== '+') {
        sort = "+" + sort;
      }

      //define searchable fileds
      let sortable = ['createdAt', 'updatedAt', 'username', '_id'];

      if(sort.trim() === ""){
        return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('invalid query params sort.'));
      }

      if(!sortable.includes(sort.substring(1))){
        return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('invalid query params sort.'));
      }

      if(!canConvertToPositiveInteger(page)){
        return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error(
          'query params page must be a positive integer.'));
      }

      if(!canConvertToPositiveInteger(size)){
        return res.status(HttpStatusCode.BAD_REQUEST).json(responseFormatter.error('invalid query params size.'));
      }

      size = (+size > 100) ? 100 : size;
      page = +page;

      let pagination = {
        page: page - 1,
        size,
        sort : sort
      }
      const messages = await userService.getList(filter, pagination);
      const totalRecords = await userService.count(filter);
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
