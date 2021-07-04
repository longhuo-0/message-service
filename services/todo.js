// mongoose modal

const debug = require('debug')('message-service:api');
const todoRepository = require('../repositories/todo');
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
      return await todoRepository.getList(filter, { page, size, sort });
    }
    catch (err) {
      throw err;
    }
  },
  create: async (todo) => {
    try {
      return await todoRepository.create(todo);
    }
    catch (err) {
      debug(err);
      throw err;
    }
  },
  updateById: async (completed, id) => {
    try {
      const result = await todoRepository.updateById({
        completed: completed
      }, id);
      return result;
    }
    catch (err) {
      throw err;
    }
  },
  getById: (id) => {
    try {
      const result = todoRepository.getById(id);
      return result;
    }
    catch (err) {
      throw err;
    }
  },
  deleteById: async (id) => {
    try {
      const result = await todoRepository.deleteById(id);
      return result;
    }
    catch (err) {
      throw err;
    }
  },
  count: async (filter) => {
    try {
      const result = await todoRepository.count(filter);
      return result;
    }
    catch (err) {
      throw err;
    }
  }
}
