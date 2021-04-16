// mongoose modal
const Message = require('../models/message');
const { isPalindromic } = require('../utils/stringHelper');
const debug = require('debug')('message-service:api');
const messageRepository = require('../repositories/message');
module.exports = {

  /**
   * @param page
   * @param size
   * @param sortBy
   * @param sortOrder
   * @returns {Promise<*>}
   */
  getList: async (filter = {}, { page = 0, size = 10, sort = '-createdAt'}) => {
    try {
      return await messageRepository.getList(filter, { page, size, sort });
    }
    catch (err) {
      throw err;
    }
  },
  create: async (message) => {
    try {
      const newMessage = new Message({
        message: message,
        palindromic: isPalindromic(message)
      });
      return await messageRepository.create(newMessage);
    }
    catch (err) {
      debug(err);
      throw err;
    }
  },
  updateById: async (message, id) => {
    try {
      const result = await messageRepository.updateById({
        message: message,
        palindromic: isPalindromic(message)
      }, id);
      return result;
    }
    catch (err) {
      throw err;
    }
  },
  getById: (id) => {
    try {
      const result = messageRepository.getById(id);
      return result;
    }
    catch (err) {
      throw err;
    }
  },
  deleteById: async (id) => {
    try {
      const result = await messageRepository.deleteById(id);
      return result;
    }
    catch (err) {
      throw err;
    }
  },
  count: async (filter) => {
    try {
      const result = await messageRepository.count(filter);
      return result;
    }
    catch (err) {
      throw err;
    }
  }
}
