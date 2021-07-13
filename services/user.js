// mongoose modal

const debug = require('debug')('message-service:api');
const userRepository = require('../repositories/user');
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
      return await userRepository.getList(filter, { page, size, sort });
    }
    catch (err) {
      throw err;
    }
  },
  create: async (user) => {
    try {
      return await userRepository.create(user);
    }
    catch (err) {
      debug(err);
      throw err;
    }
  },
  updateById: async (doc, id) => {
    try {
      const result = await userRepository.updateById(doc, id);
      return result;
    }
    catch (err) {
      throw err;
    }
  },
  getById: (id) => {
    try {
      const result = userRepository.getById(id);
      return result;
    }
    catch (err) {
      throw err;
    }
  },
  deleteById: async (id) => {
    try {
      const result = await userRepository.deleteById(id);
      return result;
    }
    catch (err) {
      throw err;
    }
  },
  count: async (filter) => {
    try {
      const result = await userRepository.count(filter);
      return result;
    }
    catch (err) {
      throw err;
    }
  }
}
