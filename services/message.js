// mongoose modal
const Message = require('../models/message');
const { isPalindromic } = require('../utils/stringHelper');
const debug = require('debug')('message-service:server');

module.exports = {
  /**
   * @param page
   * @param limit
   * @param sortBy
   * @param sortOrder
   * @returns {Promise<*>}
   */
  list: async ({ page = 0, limit = 10, sortBy = "created", sortOrder = "desc" }) => {
    try {
      const result = await Message.find({}).limit(limit * 1).skip(page * limit).sort({
        [sortBy]: sortOrder
      });
      return result;
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
      })
      const result = await newMessage.save();
      return result;
    }
    catch (err) {
      debug(err);
      throw err;
    }
  },
  updateById: async (message, id) => {
    try {
      const result = await Message.findOneAndUpdate(
        {
          _id: id,
        },
        {
          message: message,
          palindromic: isPalindromic(message)
        }, {
          new: true
        });
      if (result === null) {
        throw new Error("record not found");
      }
      return result;
    }
    catch (err) {
      throw err;
    }
  },
  getById: async (id) => {
    try {
      const result = await Message.findOne(
        {
          _id: id
        });
      return result;
    }
    catch (err) {
      throw err;
    }
  },
  deleteById: async (id) => {
    try {
      const result = await Message.findOneAndDelete(
        {
          _id: id
        });
      if (result === null) {
        throw new Error("record not found");
      }

      return result;
    }
    catch (err) {
      throw err;
    }
  }
}
